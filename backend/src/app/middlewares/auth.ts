import { RequestHandler } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { verifyToken } from "../../utils/jwt";
import { env } from "../../config/env";


export const auth = (...requiredRoles: Array<"user" |"admin">): RequestHandler =>{
    return async (req, res, next) =>{
        try {
            const token = req.cookies?.accessToken

            if(!token){
                throw new AppError(httpStatus.UNAUTHORIZED, "You are not authenticated")
            }

            const decoded = verifyToken(token, env.jwtAccessSecret)

            if(requiredRoles.length && !requiredRoles.includes(decoded.role)){
                throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
            }

            req.user = decoded

            next()

        } catch (error) {
            next(new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token"))
        }
    }
}