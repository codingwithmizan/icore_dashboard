import { PageContainer } from "@/components/common/PageContainer";
import { TestUserListHeader } from "@/components/dashborad/TestUserListHeader";
import { TestUserList } from "@/components/dashborad/TestUserList";

const getUsers = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL_V1}/users`);
  const res = await fetch(`https://dummyjson.com/users`);
  return res.json();
};

const UserListPage = async () => {
  const usersResponse = await getUsers();
  const limit = usersResponse?.limit;
  const skip = usersResponse?.skip;
  const total = usersResponse?.total;
  const users = usersResponse?.users;

  console.log("users", users);
  console.log("limit", limit);
  console.log("skip", skip);
  console.log("total", total);
  return (
    <PageContainer breadcrumbItems={[{ label: "Users" }]} backBtn={false}>
      <TestUserListHeader genderOptions={[]} divisionOptions={[]} />
      <TestUserList
        users={users}
        title="TestUsers"
        total_pages={0}
        total_count={0}
        //  total_pages={meta?.total_pages || 0}
        //  total_count={meta?.total_count || 0}
      />
    </PageContainer>
  );
};

export default UserListPage;
