import { getData } from "@/lib/services/api";
import { SelectOption } from "@/lib/models";

export const getUserFormData = async () => {
  const [genderRes, organisationRes, divisionRes] = await Promise.all([
    getData<{ genders: SelectOption[] }>("get_genders"),
    getData<{ organisations: SelectOption[] }>("get_organisations"),
    getData<{ divisions: SelectOption[] }>("locations/get_divisions"),
  ]);

  return {
    genderOptions: genderRes.data?.genders || [],
    organisationOptions: organisationRes.data?.organisations || [],
    divisionOptions: divisionRes.data?.divisions || [],
  };
};

export const getListFilterData = async () => {
  const [genderRes, divisionRes] = await Promise.all([
    getData<{ genders: SelectOption[] }>("get_genders"),
    getData<{ divisions: SelectOption[] }>("locations/get_divisions"),
  ]);

  return {
    genderOptions: genderRes.data?.genders || [],
    divisionOptions: divisionRes.data?.divisions || [],
  };
};
