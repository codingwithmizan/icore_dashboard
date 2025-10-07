"use client";

import { Table, TableProps } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Props<RecordType extends object>
  extends Omit<TableProps<RecordType>, "columns" | "dataSource"> {
  data: RecordType[];
  columns: ColumnsType<RecordType>;
  rowKey?: keyof RecordType | ((record: RecordType) => React.Key);
  isPaginated?: boolean;
  size?: "small" | "middle" | "large";
}

export const DataTable = <RecordType extends object>({
  data,
  columns,
  rowKey = "id" as keyof RecordType,
  isPaginated = false,
  size = "middle",
  className = "",
  ...restProps
}: Props<RecordType>) => {
  return (
    <Table<RecordType>
      dataSource={data}
      columns={columns}
      rowKey={rowKey}
      pagination={isPaginated ? { pageSize: 25 } : false}
      scroll={{ x: true }}
      className={className}
      size={size}
      {...restProps}
    />
  );
};
