"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useCommon } from "@/hooks";
import { UserFilter } from "@/components/general/users";
import { CreateButton, FilterButton } from "@/components/common/buttons";
import { PageTitle } from "@/components/common";
import { SelectOption } from "@/lib/models";
import { InputSearch } from "@/components/common/form-controls";

interface Props {
  genderOptions: SelectOption[];
  divisionOptions: SelectOption[];
}

export const TestUserListHeader: FC<Props> = ({ genderOptions, divisionOptions }) => {
  const router = useRouter();
  const { open, setOpen } = useCommon();

  const handleCreate = () => router.push("/test-users/new");
  const handleFilterOpen = () => setOpen(true);

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageTitle
          type="list"
          name="user"
          actionComponent={<CreateButton handleCreate={handleCreate} />}
        />
        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
          <div className="min-w-72">
            <InputSearch placeholder="Seach by (ID, Name or Phone)" />
          </div>
          <FilterButton btnType="show" onClick={handleFilterOpen} />
        </div>
      </div>
      <UserFilter
        open={open}
        setOpen={setOpen}
        genderOptions={genderOptions}
        divisionOptions={divisionOptions}
      />
    </>
  );
};
