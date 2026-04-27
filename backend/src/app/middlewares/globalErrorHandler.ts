import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import AppError from "../errors/AppError";
import { env } from "../../config/env";

type TErrorResponse = {
  success: false;
  message: string;
  errorSources?: {
    path: string | number;
    message: string;
  }[];
  stack?: string;
};

export const globalErrorHandlerr: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: TErrorResponse["errorSources"] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (error instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";

    errorSources = error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;

    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;

    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  const response: TErrorResponse = {
    success: false,
    message,
    errorSources,
  };

  if (env.nodeEnv === "development") {
    response.stack = error?.stack;
  }

  res.status(statusCode).json(response);
};
