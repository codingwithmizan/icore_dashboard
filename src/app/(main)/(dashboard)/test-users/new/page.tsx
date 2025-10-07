import { PageContainer } from "@/components/common";
import { NewUserForm } from "@/components/dashborad/TestUserForm";
import { getUserFormData } from "@/lib/services/user";
import { PageTitle } from "@/components/common";

const UserCreatePage = async () => {
  const { genderOptions, organisationOptions, divisionOptions } = await getUserFormData();

  return (
    <PageContainer breadcrumbItems={[{ label: "Users", href: "/users" }, { label: "Create" }]}>
      <PageTitle type="create" name="user" />
      <NewUserForm
        genderOptions={genderOptions}
        organisationOptions={organisationOptions}
        divisionOptions={divisionOptions}
      />
    </PageContainer>
  );
};

export default UserCreatePage;
