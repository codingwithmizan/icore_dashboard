import { FC } from "react";
import { PageContainer } from "@/components/common";
import { UserForm } from "@/components/general/users";
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

  const user = (userRes.data?.user as User) ?? {};

  return (
    <PageContainer breadcrumbItems={[{ label: "Users", href: "/users" }, { label: "Edit" }]}>
      <PageTitle type="edit" name="user" />
      <UserForm
        user={user}
        genderOptions={genderOptions}
        organisationOptions={organisationOptions}
        divisionOptions={divisionOptions}
      />
    </PageContainer>
  );
};

export default UserEditPage;
