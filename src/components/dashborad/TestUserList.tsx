"use client";

import { FC } from "react";
import { DataTable, Pagination } from "@/components/common";
import { ActionButton } from "@/components/common/buttons";
import { TestUser } from "@/lib/models";
import { Space } from "antd";
import { titleCase } from "@/lib/helpers";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

interface Props {
  title: string;
  users: TestUser[];
  total_pages: number;
  total_count: number;
}

export const TestUserList: FC<Props> = ({ title, users, total_pages, total_count }) => {
  const userColumns: ColumnsType<TestUser> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      className: "font-mono",
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date of Birth",
      dataIndex: "birthDate",
      key: "birthDate",
      render: (birthDate: string) => dayjs(birthDate).format("DD MMM YYYY"),
      sorter: (a, b) => dayjs(a.birthDate).unix() - dayjs(b.birthDate).unix(),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Designation",
      dataIndex: "company.title",
      key: "company.title",
      render: (_: unknown, record: TestUser) => <span>{titleCase(record.company.title)}</span>,
    },
    {
      title: "City",
      dataIndex: "address.city",
      key: "address.city",
      render: (_: unknown, record: TestUser) => <span>{titleCase(record.address.city)}</span>,
    },
        {
      title: "Country",
      dataIndex: "address.country",
      key: "address.country",
      render: (_: unknown, record: TestUser) => <span>{titleCase(record.address.country)}</span>,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_: unknown, record: TestUser) => (
        <Space size="middle">
          <ActionButton btnType="view" url={`test-users/${record.id}`} />
          <ActionButton btnType="edit" url={`test-users/${record.id}/edit`} />
          <ActionButton
            btnType="delete"
            url={`test-users/${record.id}`}
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
