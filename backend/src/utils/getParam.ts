import AppError from "../app/errors/AppError";
import httpStatus from "http-status";

export const getParams = (
  value: string | string[] | undefined,
  name: "id",
): string => {
  if (!value || Array.isArray(value)) {
    throw new AppError(httpStatus.BAD_REQUEST, `Invalid ${name} parameter`);
  }

  return value;
};
