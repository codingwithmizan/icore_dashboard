import {
  useQueryStates,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs";

export type SortOrder = "asc" | "desc";

export const useSearchParams = () => {
  const [params, setParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      perPage: parseAsInteger.withDefault(25),
      query: parseAsString.withDefault(""),
      sort: parseAsStringEnum<SortOrder>(["asc", "desc"]).withDefault("asc"),
    },
    {
      shallow: false,
      // history: "push",
      // clearOnDefault: false,
    }
  );

  const setPage = (page: number) => setParams((prev) => ({ ...prev, page }));
  const setPerPage = (perPage: number) =>
    setParams((prev) => ({ ...prev, perPage, page: 1 }));
  const setQuery = (query: string) =>
    setParams((prev) => ({ ...prev, query, page: 1 }));
  const setSort = (sort: SortOrder) =>
    setParams((prev) => ({ ...prev, sort, page: 1 }));

  return {
    ...params,
    setPage,
    setPerPage,
    setQuery,
    setSort,
  };
};

