"use client";

import React, { useState, useEffect } from "react";
import type { Dayjs } from "dayjs";
import {
  Radio,
  Card,
  Statistic,
  Button,
  DatePicker,
  Select,
  Row,
  Col,
  Tag,
  Table,
  // Divider,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  FileTextOutlined,
  TransactionOutlined,
  WalletOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

// Enhanced dummy data with green shades
const collectionData = [
  { name: "Cash in Hand", amount: 12500, trend: "up", color: "#52c41a" },
  { name: "Deposit in Transit", amount: 8500, trend: "down", color: "#73d13d" },
  { name: "Total Recovered", amount: 64111, trend: "up", color: "#389e0d" },
  { name: "Overdue", amount: 28900, trend: "up", color: "#237804" },
  { name: "Expected", amount: 45600, trend: "stable", color: "#95de64" },
];

const lateFeeData = [
  { name: "Total", value: 25403, color: "#ff4d4f" },
  { name: "Collected", value: 18700, color: "#52c41a" },
  { name: "Waived", value: 6703, color: "#faad14" },
];

const recoveryData = [
  {
    key: "1",
    mf: "MF-001",
    expected: 500000,
    received: 450000,
    lateFee: 5000,
    status: "partial",
  },
  {
    key: "2",
    mf: "MF-002",
    expected: 300000,
    received: 300000,
    lateFee: 0,
    status: "complete",
  },
  {
    key: "3",
    mf: "MF-003",
    expected: 400000,
    received: 200000,
    lateFee: 10000,
    status: "partial",
  },
  {
    key: "4",
    mf: "MF-004",
    expected: 600000,
    received: 0,
    lateFee: 0,
    status: "pending",
  },
];

// const COLORS = ["#52c41a", "#73d13d", "#95de64"];

const FieldFinancing = () => {
  const [activeTab, setActiveTab] = useState<
    "disbursement" | "recovery" | "collection"
  >("disbursement");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [region, setRegion] = useState<string>("all");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  const columns = [
    {
      title: "MF ID",
      dataIndex: "mf",
      key: "mf",
    },
    {
      title: "Expected (৳)",
      dataIndex: "expected",
      key: "expected",
      render: (text: number) => text.toLocaleString(),
    },
    {
      title: "Received (৳)",
      dataIndex: "received",
      key: "received",
      render: (text: number) => text.toLocaleString(),
    },
    {
      title: "Late Fee (৳)",
      dataIndex: "lateFee",
      key: "lateFee",
      render: (text: number) => text.toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "";
        let icon = null;
        if (status === "complete") {
          color = "green";
          icon = <CheckCircleOutlined />;
        } else if (status === "partial") {
          color = "orange";
          icon = <SyncOutlined spin />;
        } else {
          color = "red";
          icon = <ClockCircleOutlined />;
        }
        return (
          <Tag icon={icon} color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="link" size="small" className="text-green-600">
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Field Financing
            </h2>
          </div>
          {currentTime && (
            <div className="flex items-center gap-2">
              <Tag color="green" icon={<SyncOutlined />}>
                Last Updated: {currentTime}
              </Tag>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card
        className="mb-8 shadow-sm border-0"
        styles={{ body: { padding: "24px" } }}
      >
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <RangePicker
              value={dateRange}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setDateRange([dates[0], dates[1]]);
                } else {
                  setDateRange(null);
                }
              }}
              style={{ width: "100%" }}
              className="border-green-300 hover:border-green-500"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <Select
              value={region}
              onChange={setRegion}
              style={{ width: "100%" }}
              className="border-green-300 hover:border-green-500"
            >
              <Option value="all">All Regions</Option>
              <Option value="north">North</Option>
              <Option value="south">South</Option>
              <Option value="east">East</Option>
              <Option value="west">West</Option>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button type="primary" className="bg-green-600 hover:bg-green-700">
              Apply Filters
            </Button>
            <Button>Reset</Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="my-6">
        <Radio.Group
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          optionType="button"
          buttonStyle="solid"
          size="large"
          className="w-96 "
        >
          <Radio.Button
            value="disbursement"
            className="w-1/3 text-center hover:text-green-600"
          >
            Disbursement
          </Radio.Button>
          <Radio.Button
            value="recovery"
            className="w-1/3 text-center hover:text-green-600"
          >
            Recovery
          </Radio.Button>
          <Radio.Button
            value="collection"
            className="w-1/3 text-center hover:text-green-600"
          >
            Collection
          </Radio.Button>
        </Radio.Group>
      </div>

      {/* Tab: Disbursement */}
      {activeTab === "disbursement" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
              <TransactionOutlined className="text-green-600" /> Disbursement
              Overview
            </h3>
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              className="bg-green-600 hover:bg-green-700"
            >
              See MF List
            </Button>
          </div>

          <Row gutter={24} className="mb-8">
            <Col span={8}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                <Statistic
                  title="Requested Fund"
                  value={65000}
                  precision={0}
                  style={{ color: "#389e0d" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="৳"
                />
                <div className="mt-2 text-sm text-gray-500">
                  +12% from last month
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                <Statistic
                  title="Approved Fund"
                  value={62000}
                  precision={0}
                  style={{ color: "#389e0d" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="৳"
                />
                <div className="mt-2 text-sm text-gray-500">
                  +10% from last month
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                <Statistic
                  title="Disbursed Fund"
                  value={60000}
                  precision={0}
                  style={{ color: "#389e0d" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="৳"
                />
                <div className="mt-2 text-sm text-gray-500">
                  +8% from last month
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={24} className="mb-8">
            <Col span={12}>
              <Card
                title="Approval Rate"
                className="border-0 shadow-sm"
                styles={{ header: { borderBottom: 0, padding: "16px 24px" } }}
              >
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600">
                      95.4%
                    </div>
                    <div className="text-gray-500 mt-2">
                      of requested funds approved
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Disbursement Rate"
                className="border-0 shadow-sm"
                styles={{ header: { borderBottom: 0, padding: "16px 24px" } }}
              >
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600">
                      96.8%
                    </div>
                    <div className="text-gray-500 mt-2">
                      of approved funds disbursed
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Card
            title="Disbursement Trend (Last 6 Months)"
            className="border-0 shadow-sm mb-8"
            styles={{ header: { borderBottom: 0, padding: "16px 24px" } }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={collectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#52c41a"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Tab: Recovery */}
      {activeTab === "recovery" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
              <WalletOutlined className="text-green-600" /> Recovery Overview
            </h3>
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              className="bg-green-600 hover:bg-green-700"
            >
              See MF List
            </Button>
          </div>

          <Row gutter={24} className="mb-8">
            <Col span={6}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                <Statistic
                  title="Expected Receivables"
                  value={2296600}
                  precision={0}
                  style={{ color: "#389e0d" }}
                  prefix="৳"
                />
                <div className="text-gray-500 mt-2">7 MF accounts</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                <Statistic
                  title="Late Fee"
                  value={25403}
                  precision={0}
                  style={{ color: "#ff4d4f" }}
                  prefix="৳"
                />
                <div className="text-gray-500 mt-2">4 MF accounts</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                <Statistic
                  title="Total Receivables"
                  value={2322003}
                  precision={0}
                  style={{ color: "#389e0d" }}
                  prefix="৳"
                />
                <div className="text-gray-500 mt-2">7 MF accounts</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                <Statistic
                  title="Recovery Rate"
                  value={51.8}
                  precision={1}
                  style={{ color: "#389e0d" }}
                  suffix="%"
                />
                <div className="text-gray-500 mt-2">Current period</div>
              </Card>
            </Col>
          </Row>

          <Card
            title="Recovery Details"
            className="border-0 shadow-sm mb-8"
            styles={{ header: { borderBottom: 0, padding: "16px 24px" } }}
          >
            <Table
              columns={columns}
              dataSource={recoveryData}
              pagination={false}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={1}>
                      <strong>Total</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <strong>1,800,000</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <strong>950,000</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <strong>15,000</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4} colSpan={2}>
                      <Tag color="green">4 MF accounts</Tag>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </Card>

          <Row gutter={24} className="mb-8">
            <Col span={12}>
              <Card
                title="Recovery Trend"
                className="border-0 shadow-sm"
                styles={{ header: { borderBottom: 0, padding: "16px 24px" } }}
              >
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={[
                      { month: "Jan", recovered: 800000 },
                      { month: "Feb", recovered: 750000 },
                      { month: "Mar", recovered: 900000 },
                      { month: "Apr", recovered: 850000 },
                      { month: "May", recovered: 950000 },
                      { month: "Jun", recovered: 1200000 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="recovered"
                      stroke="#52c41a"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Recovery Status"
                className="border-0 shadow-sm"
                styles={{ header: { borderBottom: 0, padding: "16px 24px" } }}
              >
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Completed</span>
                      <span className="font-medium">1 (25%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Partial</span>
                      <span className="font-medium">2 (50%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Pending</span>
                      <span className="font-medium">1 (25%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-red-600 h-3 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      {/* Tab: Collection */}
      {activeTab === "collection" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
              <DollarOutlined className="text-green-600" /> Collection Overview
            </h3>
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              className="bg-green-600 hover:bg-green-700"
            >
              See Transactions
            </Button>
          </div>

          <Row gutter={24} className="mb-8">
            {collectionData.map((item) => (
              <Col span={8} key={item.name} className="mb-4">
                <Card
                  className="border-0 shadow-sm hover:shadow-md transition-all"
                  styles={{
                    body: {
                      backgroundColor: item.color + "10",
                      borderLeft: `4px solid ${item.color}`,
                    },
                  }}
                >
                  <Statistic
                    title={<span className="text-gray-700">{item.name}</span>}
                    value={item.amount}
                    precision={0}
                    style={{
                      color: item.color,
                      fontSize: "24px",
                    }}
                    prefix={
                      item.trend === "up" ? (
                        <ArrowUpOutlined />
                      ) : item.trend === "down" ? (
                        <ArrowDownOutlined />
                      ) : null
                    }
                    suffix="৳"
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    {item.trend === "up"
                      ? "+5.2% from last week"
                      : item.trend === "down"
                      ? "-2.1% from last week"
                      : "No change"}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={24} className="mb-8">
            <Col span={12}>
              <Card
                title="Collections Overview"
                className="border-0 shadow-sm"
                styles={{ header: { borderBottom: 0, padding: "16px 24px" } }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={collectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="amount"
                      fill="#52c41a"
                      name="Amount (৳)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Late Fee Breakdown"
                className="border-0 shadow-sm"
                styles={{ header: { borderBottom: 0, padding: "16px 24px" } }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={lateFeeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(Number(percent || 0) * 100).toFixed(0)}%`
                      }
                    >
                      {lateFeeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`৳ ${value}`, "Amount"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Card
            title="Recent Transactions"
            className="border-0 shadow-sm"
            styles={{ header: { borderBottom: 0, padding: "16px 24px" } }}
          >
            <Table
              columns={[
                {
                  title: "Date",
                  dataIndex: "date",
                  key: "date",
                  render: (text) => (
                    <span className="text-gray-700">{text}</span>
                  ),
                },
                {
                  title: "MF ID",
                  dataIndex: "mf",
                  key: "mf",
                  render: (text) => (
                    <span className="text-gray-700">{text}</span>
                  ),
                },
                {
                  title: "Type",
                  dataIndex: "type",
                  key: "type",
                  render: (text) => (
                    <span className="text-gray-700">{text}</span>
                  ),
                },
                {
                  title: "Amount (৳)",
                  dataIndex: "amount",
                  key: "amount",
                  render: (text) => (
                    <span className="font-medium">{text.toLocaleString()}</span>
                  ),
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",
                  render: (status) => (
                    <Tag
                      color={status === "completed" ? "green" : "orange"}
                      className="px-3 py-1 rounded-full"
                    >
                      {status.toUpperCase()}
                    </Tag>
                  ),
                },
              ]}
              dataSource={[
                {
                  key: "1",
                  date: "2025-06-23",
                  mf: "MF-001",
                  type: "Principal",
                  amount: 150000,
                  status: "completed",
                },
                {
                  key: "2",
                  date: "2025-06-22",
                  mf: "MF-002",
                  type: "Interest",
                  amount: 25000,
                  status: "completed",
                },
                {
                  key: "3",
                  date: "2025-06-21",
                  mf: "MF-003",
                  type: "Late Fee",
                  amount: 5000,
                  status: "completed",
                },
                {
                  key: "4",
                  date: "2025-06-20",
                  mf: "MF-004",
                  type: "Principal",
                  amount: 200000,
                  status: "pending",
                },
              ]}
              pagination={false}
              className="ant-table-striped"
              rowClassName={(record, index) =>
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default FieldFinancing;



