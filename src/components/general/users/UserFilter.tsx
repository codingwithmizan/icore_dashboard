"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { BaseFilter } from "@/components/common";
import { useUserSearchParams } from "@/hooks";
import { DATE_FORMAT } from "@/lib/constants";
import { SelectOption, UserFilterData } from "@/lib/models";
import { InputBlock, SelectBlock, DateBlock } from "@/components/common/form-control-blocks";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  genderOptions: SelectOption[];
  divisionOptions: SelectOption[];
}

export const UserFilter: FC<Props> = ({ open, setOpen, genderOptions, divisionOptions }) => {
  const { setQueryParams, clearQueryParams, city, designation, gender, dob, setPage } =
    useUserSearchParams();

  const { control, handleSubmit, reset } = useForm<UserFilterData>({
    defaultValues: {
      designation: designation,
      dob: dob ? dayjs(dob) : undefined,
      city: city,
      gender: gender,
    },
  });

  const onSubmit = ({ dob, ...rest }: UserFilterData) => {
    setQueryParams({
      ...rest,
      dob: dob ? dayjs(dob).format(DATE_FORMAT) : "",
    });
    setOpen(false);
  };

  const onReset = () => {
    reset({
      designation: "",
      dob: "",
      city: "",
      gender: "",
    });
    clearQueryParams();
    setPage(1);
    setOpen(false);
  };

  const handleBaseFilterSubmit = (onValid: (values: UserFilterData) => void) =>
    handleSubmit((data) => {
      onValid({
        ...data,
        dob: data.dob ? dayjs(data.dob).format(DATE_FORMAT) : "",
      });
    });

  return (
    <BaseFilter
      open={open}
      setOpen={setOpen}
      onSubmit={onSubmit}
      handleSubmit={handleBaseFilterSubmit}
      onReset={onReset}
    >
      <div className="grid grid-cols-1 gap-4">
        <SelectBlock
          name="gender"
          label="Gender"
          control={control}
          options={genderOptions}
          placeholder="Select a gender"
        />
        <SelectBlock
          name="city"
          label="City"
          control={control}
          options={divisionOptions}
          placeholder="Select a city"
        />
        <InputBlock
          name="designation"
          label="Designation"
          control={control}
          placeholder="e.g. Software Engineer"
        />
        <DateBlock
          name="dob"
          label="Date of Birth"
          control={control}
          placeholder="Select date of birth"
        />
      </div>
    </BaseFilter>
  );
};
