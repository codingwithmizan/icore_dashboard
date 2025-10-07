import { FC } from "react";

interface Props {
  errMsg: string;
}
export const ErrorMessage: FC<Props> = ({ errMsg }) => {
  return <p className="text-red-600 mt-2 text-sm font-normal">{errMsg}</p>;
};
