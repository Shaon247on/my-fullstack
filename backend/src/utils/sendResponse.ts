import { Response } from "express";

type TSendResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
  };
};

export const sendResponse = <T>(res: Response, payload: TSendResponse<T>) => {
  const responseData = {
    success: payload.success,
    message: payload.message,
    meta: payload.meta,
    data: payload.data,
  };

  res.status(payload.statusCode).json(responseData);
};
