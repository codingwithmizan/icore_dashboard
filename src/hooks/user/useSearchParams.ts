import { useQueryStates, parseAsString } from "nuqs";
import { UserFilterData } from "@/lib/models";
import { useSearchParams } from "@/hooks";

const defaultQueryConfig = {
  designation: parseAsString.withDefault(""),
  gender: parseAsString.withDefault(""),
  dob: parseAsString.withDefault(""),
  city: parseAsString.withDefault(""),
};

export const useUserSearchParams = () => {
  const { setPage } = useSearchParams();
  const [filter, setFilter] = useQueryStates(defaultQueryConfig, {
    shallow: false,
  });

  const setQueryParams = (values: UserFilterData) => {
    setFilter({
      designation: values.designation ?? "",
      gender: values.gender ?? "",
      dob:
        typeof values.dob === "string"
          ? values.dob
          : values.dob?.toISOString?.() ?? "",
      city: values.city ?? "",
    });
    setPage(1);
  };

  const clearQueryParams = () => setFilter(null);

  return {
    ...filter,
    setQueryParams,
    clearQueryParams,
    setPage,
  };
};
