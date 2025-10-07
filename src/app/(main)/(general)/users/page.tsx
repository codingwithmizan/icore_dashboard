import { FC } from "react";
import { getData } from "@/lib/services/api";
import { getListFilterData } from "@/lib/services/user";
import { PageContainer } from "@/components/common";
import { UserListHeader, UserList } from "@/components/general/users";
import { User, Meta } from "@/lib/models";

interface Props {
  searchParams: Promise<{
    query?: string;
    page?: number;
    perPage?: number;
    dob?: string;
    city?: string;
    gender?: string;
    designation?: string;
  }>;
}

const UserListPage: FC<Props> = async ({ searchParams }) => {
  const {
    query = "",
    page = 1,
    perPage = 25,
    dob = "",
    city = "",
    gender = "",
    designation = "",
  } = await searchParams;

  const urlParams = new URLSearchParams({
    query,
    page: page.toString(),
    per_page: perPage.toString(),
    dob,
    city,
    gender,
    designation,
  });

  const [{ genderOptions, divisionOptions }, res] = await Promise.all([
    getListFilterData(),
    getData<{ users: User[]; meta: Meta }>(`users?${urlParams}`),
  ]);

  const users = res.data?.users || [];
  const meta = res.data?.meta;

  return (
    <PageContainer breadcrumbItems={[{ label: "Users" }]} backBtn={false}>
      <UserListHeader genderOptions={genderOptions} divisionOptions={divisionOptions} />
      <UserList
        users={users}
        title="Users"
        total_pages={meta?.total_pages || 0}
        total_count={meta?.total_count || 0}
      />
    </PageContainer>
  );
};

export default UserListPage;

//   Other approaches (query params and data fetching)
//   const url = `users?query=${query}&page=${page}&per_page=${perPage}&dob=${dob}&city=${city}&gender=${gender}&designation=${designation}`;
//   const res = await getData<{ users: User[]; meta: Meta }>(url);
//   const { genderOptions, divisionOptions } = await getListFilterData();
