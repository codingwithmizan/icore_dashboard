import { FC } from "react";
import Link from "next/link";
import { Button } from "antd";
import { getData } from "@/lib/services/api";
import { User } from "@/lib/models";
import { PageContainer } from "@/components/common";
import { UserDetails } from "@/components/general/users";
import { FiEdit2 } from "react-icons/fi";
import { PageTitle } from "@/components/common";

interface Props {
  params: Promise<{ id: string }>;
}

const UserDetailsPage: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const res = await getData<{ user: User }>(`users/${id}`);
  const user = (res.data?.user as User) ?? {};

  return (
    <PageContainer breadcrumbItems={[{ label: "Users", href: "/users" }, { label: "Details" }]}>
        <div className="flex items-center justify-between">
          <PageTitle type="details" name="user" id={id} subTitle="user" />
          <Link href={`/users/${id}/edit`}>
            <Button color="orange" variant="outlined" icon={<FiEdit2 />}>
              Edit
            </Button>
          </Link>
        </div>
        <UserDetails user={user} />
    </PageContainer>
  );
};

export default UserDetailsPage;
