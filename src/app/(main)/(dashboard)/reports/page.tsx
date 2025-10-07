"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  DatePicker,
  Card,
  Statistic,
  Row,
  Col,
  Button,
  Dropdown,
  MenuProps,
  Checkbox,
  Tag,
  Modal,
  Space,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  FilterOutlined,
  SettingOutlined,
  FileTextOutlined,
  BarChartOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { usePapaParse } from "react-papaparse";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

type ReportStatus = "Completed" | "Pending" | "Failed";
type ReportType = "Financial" | "Operational" | "Analytical";
type Department = "Sales" | "Marketing" | "Engineering" | "HR";

interface ReportItem {
  id: string;
  title: string;
  status: ReportStatus;
  date: string;
  type: ReportType;
  department: Department;
  author: string;
  views: number;
  size: string;
}

interface TableColumn {
  title: string;
  dataIndex: string;
  key: string;
  sorter?: (a: ReportItem, b: ReportItem) => number;
  render?: (text: string, record: ReportItem) => React.ReactNode;
  visible: boolean;
}

const statusColors: Record<ReportStatus, string> = {
  Completed: "green",
  Pending: "orange",
  Failed: "red",
};

const typeColors: Record<ReportType, string> = {
  Financial: "blue",
  Operational: "purple",
  Analytical: "cyan",
};

const departmentColors: Record<Department, string> = {
  Sales: "magenta",
  Marketing: "volcano",
  Engineering: "geekblue",
  HR: "gold",
};

const generateMockData = (): ReportItem[] => {
  const statuses: ReportStatus[] = ["Completed", "Pending", "Failed"];
  const types: ReportType[] = ["Financial", "Operational", "Analytical"];
  const departments: Department[] = ["Sales", "Marketing", "Engineering", "HR"];
  const authors = [
    "John Smith",
    "Emma Johnson",
    "Michael Brown",
    "Sarah Davis",
    "David Wilson",
  ];

  return Array.from({ length: 25 }, (_, i) => ({
    id: `#REP-${1000 + i}`,
    title: `${types[i % 3]} Report Q${Math.floor(i / 6) + 1}`,
    status: statuses[i % 3],
    date: dayjs().subtract(i, "day").format("YYYY-MM-DD"),
    type: types[i % 3],
    department: departments[i % 4],
    author: authors[i % 5],
    views: Math.floor(Math.random() * 500),
    size: `${(Math.random() * 5 + 0.1).toFixed(1)} MB`,
  }));
};

const Reports: React.FC = () => {
  const { jsonToCSV } = usePapaParse();
  const [tableData, setTableData] = useState<ReportItem[]>([]);
  const [filteredData, setFilteredData] = useState<ReportItem[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [statusFilter, setStatusFilter] = useState<ReportStatus[]>([]);
  const [typeFilter, setTypeFilter] = useState<ReportType[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<Department[]>([]);
  const [authorFilter, setAuthorFilter] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "id",
    "title",
    "status",
    "date",
    "action",
  ]);
  const [columnModalOpen, setColumnModalOpen] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  useEffect(() => {
    setTableData(generateMockData());
  }, []);

  useEffect(() => {
    let result = [...tableData];

    if (searchText) {
      result = result.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }

    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange;
      result = result.filter((item) =>
        dayjs(item.date).isBetween(start, end, "day", "[]")
      );
    }

    if (statusFilter.length > 0) {
      result = result.filter((item) => statusFilter.includes(item.status));
    }

    if (typeFilter.length > 0) {
      result = result.filter((item) => typeFilter.includes(item.type));
    }

    if (departmentFilter.length > 0) {
      result = result.filter((item) =>
        departmentFilter.includes(item.department)
      );
    }

    if (authorFilter.length > 0) {
      result = result.filter((item) => authorFilter.includes(item.author));
    }

    setFilteredData(result);
  }, [
    tableData,
    searchText,
    dateRange,
    statusFilter,
    typeFilter,
    departmentFilter,
    authorFilter,
  ]);

  const handleCSVExport = () => {
    const csv = jsonToCSV(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "reports.csv");
  };

  const handlePDFExport = async () => {
    const blob = await pdf(<PDFReport data={filteredData} />).toBlob();
    saveAs(blob, "reports.pdf");
  };

  const handleColumnChange = (checkedValues: string[]) => {
    setVisibleColumns(checkedValues);
  };

  const handleViewReport = (record: ReportItem) => {
    setSelectedReport(record);
    setReportModalOpen(true);
  };

  const createFilterMenu = <T extends string>(
    title: string,
    items: T[],
    currentFilter: T[],
    setFilter: React.Dispatch<React.SetStateAction<T[]>>,
    colors?: Record<T, string>
  ): MenuProps => {
    return {
      items: [
        {
          key: "group",
          type: "group",
          label: title,
          children: items.map((item) => ({
            key: item,
            label: (
              <Checkbox
                checked={currentFilter.includes(item)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilter([...currentFilter, item]);
                  } else {
                    setFilter(currentFilter.filter((i) => i !== item));
                  }
                }}
              >
                {colors ? <Tag color={colors[item]}>{item}</Tag> : item}
              </Checkbox>
            ),
          })),
        },
      ],
    };
  };

  interface ActionColumnRenderProps {
    _: unknown;
    record: ReportItem;
  }

  // interface StatusColumnRenderProps {
  //   status: ReportStatus;
  // }

  // interface DateColumnRenderProps {
  //   date: string;
  // }

  // interface TypeColumnRenderProps {
  //   type: ReportType;
  // }

  // interface DepartmentColumnRenderProps {
  //   department: Department;
  // }

  const columns: TableColumn[] = [
    {
      title: "Report ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: ReportItem, b: ReportItem) => a.id.localeCompare(b.id),
      visible: visibleColumns.includes("id"),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: ReportItem, b: ReportItem) => a.title.localeCompare(b.title),
      visible: visibleColumns.includes("title"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: ReportItem) => (
        <Tag color={statusColors[record.status]}>{record.status}</Tag>
      ),
      sorter: (a: ReportItem, b: ReportItem) =>
        a.status.localeCompare(b.status),
      visible: visibleColumns.includes("status"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string, record: ReportItem) =>
        dayjs(record.date).format("MMM D, YYYY"),
      sorter: (a: ReportItem, b: ReportItem) =>
        dayjs(a.date).unix() - dayjs(b.date).unix(),
      visible: visibleColumns.includes("date"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, record: ReportItem) => (
        <Tag color={typeColors[record.type]}>{record.type}</Tag>
      ),
      sorter: (a: ReportItem, b: ReportItem) => a.type.localeCompare(b.type),
      visible: visibleColumns.includes("type"),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (text: string, record: ReportItem) => (
        <Tag color={departmentColors[record.department]}>
          {record.department}
        </Tag>
      ),
      sorter: (a: ReportItem, b: ReportItem) =>
        a.department.localeCompare(b.department),
      visible: visibleColumns.includes("department"),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      sorter: (a: ReportItem, b: ReportItem) =>
        a.author.localeCompare(b.author),
      visible: visibleColumns.includes("author"),
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      sorter: (a: ReportItem, b: ReportItem) => a.views - b.views,
      visible: visibleColumns.includes("views"),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      sorter: (a: ReportItem, b: ReportItem) =>
        parseFloat(a.size) - parseFloat(b.size),
      visible: visibleColumns.includes("size"),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (
        _: ActionColumnRenderProps["_"],
        record: ActionColumnRenderProps["record"]
      ) => (
        <Button
          type="link"
          icon={<FileTextOutlined />}
          onClick={() => handleViewReport(record)}
        >
          Details
        </Button>
      ),
      visible: visibleColumns.includes("action"),
    },
  ].filter((col) => col.visible);

  const statusOptions = Array.from(
    new Set(tableData.map((item) => item.status))
  );
  const typeOptions = Array.from(new Set(tableData.map((item) => item.type)));
  const departmentOptions = Array.from(
    new Set(tableData.map((item) => item.department))
  );
  const authorOptions = Array.from(
    new Set(tableData.map((item) => item.author))
  );

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Reports</h1>
          <p className="text-gray-500">
            Track and analyze all generated reports
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
          <Input
            placeholder="Search reports..."
            prefix={<SearchOutlined />}
            className="w-full sm:w-64"
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <RangePicker
            className="w-full sm:w-auto"
            onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs])}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Dropdown
          menu={createFilterMenu<ReportStatus>(
            "Status",
            statusOptions,
            statusFilter,
            setStatusFilter,
            statusColors
          )}
          trigger={["click"]}
        >
          <Button icon={<FilterOutlined />}>
            Status {statusFilter.length > 0 && `(${statusFilter.length})`}
          </Button>
        </Dropdown>

        <Dropdown
          menu={createFilterMenu<ReportType>(
            "Type",
            typeOptions,
            typeFilter,
            setTypeFilter,
            typeColors
          )}
          trigger={["click"]}
        >
          <Button icon={<FilterOutlined />}>
            Type {typeFilter.length > 0 && `(${typeFilter.length})`}
          </Button>
        </Dropdown>

        <Dropdown
          menu={createFilterMenu<Department>(
            "Department",
            departmentOptions,
            departmentFilter,
            setDepartmentFilter,
            departmentColors
          )}
          trigger={["click"]}
        >
          <Button icon={<FilterOutlined />}>
            Department{" "}
            {departmentFilter.length > 0 && `(${departmentFilter.length})`}
          </Button>
        </Dropdown>

        <Dropdown
          menu={createFilterMenu<string>(
            "Author",
            authorOptions,
            authorFilter,
            setAuthorFilter
          )}
          trigger={["click"]}
        >
          <Button icon={<FilterOutlined />}>
            Author {authorFilter.length > 0 && `(${authorFilter.length})`}
          </Button>
        </Dropdown>

        <Button
          icon={<SettingOutlined />}
          onClick={() => setColumnModalOpen(true)}
        >
          Columns
        </Button>

        <div className="flex-grow" />

        <Space>
          <Button icon={<DownloadOutlined />} onClick={handleCSVExport}>
            CSV
          </Button>
          <Button icon={<DownloadOutlined />} onClick={handlePDFExport}>
            PDF
          </Button>
        </Space>
      </div>

      {/* KPI Cards */}
      <Row gutter={16} className="mb-6">
        {[
          {
            title: "Total Reports",
            value: filteredData.length,
            icon: <FileTextOutlined />,
          },
          {
            title: "Completed",
            value: filteredData.filter((r) => r.status === "Completed").length,
            color: "#52c41a",
            icon: <FileTextOutlined />,
          },
          {
            title: "Pending Review",
            value: filteredData.filter((r) => r.status === "Pending").length,
            color: "#faad14",
            icon: <FileTextOutlined />,
          },
          {
            title: "Failed",
            value: filteredData.filter((r) => r.status === "Failed").length,
            color: "#f5222d",
            icon: <FileTextOutlined />,
          },
        ].map((stat, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <Card className="h-full">
              <Statistic
                title={stat.title}
                value={stat.value}
                style={{ color: stat.color }}
                prefix={stat.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 rounded-lg shadow-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Report List</h2>
          <div className="text-sm text-gray-500">
            Showing {filteredData.length} of {tableData.length} reports
          </div>
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
          scroll={{ x: true }}
          bordered
        />
      </motion.div>

      {/* Column Selection Modal */}
      <Modal
        title="Select Columns"
        open={columnModalOpen}
        onCancel={() => setColumnModalOpen(false)}
        footer={[
          <Button
            key="reset"
            onClick={() =>
              setVisibleColumns(["id", "title", "status", "date", "action"])
            }
          >
            Reset
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => setColumnModalOpen(false)}
          >
            Apply
          </Button>,
        ]}
      >
        <Checkbox.Group
          value={visibleColumns}
          onChange={handleColumnChange}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { value: "id", label: "Report ID" },
            { value: "title", label: "Title" },
            { value: "status", label: "Status" },
            { value: "date", label: "Date" },
            { value: "type", label: "Type" },
            { value: "department", label: "Department" },
            { value: "author", label: "Author" },
            { value: "views", label: "Views" },
            { value: "size", label: "Size" },
            { value: "action", label: "Actions" },
          ].map((item) => (
            <Checkbox key={item.value} value={item.value}>
              {item.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Modal>

      {/* Report Detail Modal */}
      <Modal
        title={
          <>
            <FileTextOutlined /> Report Details
          </>
        }
        open={reportModalOpen}
        onCancel={() => setReportModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setReportModalOpen(false)}>
            Close
          </Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            Download
          </Button>,
        ]}
        width={800}
      >
        {selectedReport && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title="Basic Information" size="small">
                <div className="space-y-2">
                  <div>
                    <strong>ID:</strong> {selectedReport.id}
                  </div>
                  <div>
                    <strong>Title:</strong> {selectedReport.title}
                  </div>
                  <div>
                    <strong>Status:</strong>
                    <Tag
                      color={statusColors[selectedReport.status]}
                      className="ml-2"
                    >
                      {selectedReport.status}
                    </Tag>
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    {dayjs(selectedReport.date).format("MMMM D, YYYY")}
                  </div>
                </div>
              </Card>

              <Card title="Metadata" size="small">
                <div className="space-y-2">
                  <div>
                    <strong>Type:</strong>
                    <Tag
                      color={typeColors[selectedReport.type]}
                      className="ml-2"
                    >
                      {selectedReport.type}
                    </Tag>
                  </div>
                  <div>
                    <strong>Department:</strong>
                    <Tag
                      color={departmentColors[selectedReport.department]}
                      className="ml-2"
                    >
                      {selectedReport.department}
                    </Tag>
                  </div>
                  <div>
                    <strong>Author:</strong> {selectedReport.author}
                  </div>
                  <div>
                    <strong>Size:</strong> {selectedReport.size}
                  </div>
                </div>
              </Card>
            </div>

            <Card title="Statistics" size="small">
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="Views"
                    value={selectedReport.views}
                    prefix={<EyeOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title="Last Accessed" value="2 days ago" />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Downloads"
                    value={Math.floor(selectedReport.views / 3)}
                  />
                </Col>
              </Row>
            </Card>

            <Card title="Preview" size="small">
              <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400">
                <BarChartOutlined className="text-4xl mr-2" />
                Report Preview
              </div>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

const PDFReport: React.FC<{ data: ReportItem[] }> = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 10,
      fontFamily: "Helvetica",
    },
    header: {
      fontSize: 16,
      marginBottom: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    tableHeader: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      borderBottomStyle: "solid",
      alignItems: "center",
      marginBottom: 5,
      fontWeight: "bold",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 0.5,
      borderBottomColor: "#ddd",
      borderBottomStyle: "solid",
      alignItems: "center",
      paddingVertical: 5,
    },
    cell: {
      width: "12%",
      paddingHorizontal: 4,
    },
    cellLarge: {
      width: "16%",
      paddingHorizontal: 4,
    },
    footer: {
      position: "absolute",
      bottom: 20,
      left: 30,
      right: 30,
      fontSize: 8,
      textAlign: "center",
      borderTopWidth: 0.5,
      borderTopColor: "#ddd",
      borderTopStyle: "solid",
      paddingTop: 5,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>
          Reports Export - {dayjs().format("MMMM D, YYYY")}
        </Text>

        <View style={styles.tableHeader}>
          <Text style={styles.cell}>ID</Text>
          <Text style={styles.cellLarge}>Title</Text>
          <Text style={styles.cell}>Status</Text>
          <Text style={styles.cell}>Date</Text>
          <Text style={styles.cell}>Type</Text>
          <Text style={styles.cell}>Department</Text>
          <Text style={styles.cell}>Author</Text>
          <Text style={styles.cell}>Views</Text>
          <Text style={styles.cell}>Size</Text>
        </View>

        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cellLarge}>{item.title}</Text>
            <Text style={styles.cell}>{item.status}</Text>
            <Text style={styles.cell}>
              {dayjs(item.date).format("MMM D, YY")}
            </Text>
            <Text style={styles.cell}>{item.type}</Text>
            <Text style={styles.cell}>{item.department}</Text>
            <Text style={styles.cell}>{item.author}</Text>
            <Text style={styles.cell}>{item.views}</Text>
            <Text style={styles.cell}>{item.size}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text>
            Generated on {dayjs().format("MMMM D, YYYY h:mm A")} | Total
            Reports: {data.length}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Reports;

