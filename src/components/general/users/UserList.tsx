"use client";

import { FC } from "react";
import { DataTable, Pagination } from "@/components/common";
import { ActionButton } from "@/components/common/buttons";
import { User } from "@/lib/models";
import { Space } from "antd";
import { titleCase } from "@/lib/helpers";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

interface Props {
  title: string;
  users: User[];
  total_pages: number;
  total_count: number;
}

export const UserList: FC<Props> = ({ title, users, total_pages, total_count }) => {
  const userColumns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      className: "font-mono",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Gender",
      dataIndex: "gender.name",
      key: "gender.name",
      render: (_: unknown, record: User) => <span>{titleCase(record.gender.name)}</span>,
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
      render: (dob: string) => dayjs(dob).format("DD MMM YYYY"),
      sorter: (a, b) => dayjs(a.dob).unix() - dayjs(b.dob).unix(),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "City",
      dataIndex: "division.name",
      key: "division.name",
      render: (_: unknown, record: User) => <span>{titleCase(record.division.name)}</span>,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_: unknown, record: User) => (
        <Space size="middle">
          <ActionButton btnType="view" url={`users/${record.id}`} />
          <ActionButton btnType="edit" url={`users/${record.id}/edit`} />
          <ActionButton
            btnType="delete"
            url={`users/${record.id}`}
            confirmMsg={`Sure to delete user - ${record.id}?`}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <DataTable data={users} columns={userColumns} />
      <Pagination title={title} total_pages={total_pages} total_count={total_count} />
    </>
  );
};
