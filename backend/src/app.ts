import express, { Application, Request, Response } from "express";
import cors from "cors";
import { env } from "./config/env";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import { notFound } from "./app/middlewares/notFound";
import { globalErrorHandlerr } from "./app/middlewares/globalErrorHandler";

const app: Application = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Backend server is running successfully",
  });
});

app.use("/api/v1", router);

app.use(notFound);

app.use(globalErrorHandlerr);

export default app;
