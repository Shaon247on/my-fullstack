import jwt, { SignOptions } from "jsonwebtoken";

type TJwtPayload = {
  userId: string;
  email: string;
  role: "user" | "admin";
};

export const createToken = (
  payload: TJwtPayload,
  secret: string,
  expiresIn: SignOptions["expiresIn"],
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as TJwtPayload;
};
