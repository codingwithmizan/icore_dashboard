import { FC } from "react";
import { PageContainer } from "@/components/common";
import { NewUserForm } from "@/components/dashborad/TestUserForm";
import { getUserFormData } from "@/lib/services/user";
import { getData } from "@/lib/services/api";
import { User } from "@/lib/models";
import { PageTitle } from "@/components/common";

interface Props {
  params: Promise<{ id: string }>;
}

const UserEditPage: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const [{ genderOptions, organisationOptions, divisionOptions }, userRes] = await Promise.all([
    getUserFormData(),
    getData<{ user: User }>(`users/${id}`),
  ]);

  console.log(userRes.data);
  // const user = (userRes.data?.user as User) ?? {};
const user = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  gender: {
    id: 1,
    name: "Male"
  },
  dob: "1991-06-05", // use ISO format for better compatibility
  organisation: {
    id: 2,
    name: "Org B"
  },
  division: {
    id: 3,
    name: "Division C"
  },
  district: {
    id: 3,
    name: "District C"
  },
  upazila: {
    id: 2,
    name: "Upazila B"
  },
  address: "123 Main St, City, Country",
  contact_number: "+1234567890",
  note: "Compiled in 152ms",
  designation: "Software Engineer",
  avatar_url: "https://example.com/avatar.jpg",
  age: 30
};

  return (
    <PageContainer breadcrumbItems={[{ label: "Users", href: "/users" }, { label: "Edit" }]}>
      <PageTitle type="edit" name="user" />
      <NewUserForm
        user={user}
        genderOptions={genderOptions}
        organisationOptions={organisationOptions}
        divisionOptions={divisionOptions}
      />
    </PageContainer>
  );
};

export default UserEditPage;
