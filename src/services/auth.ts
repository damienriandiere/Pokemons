import jwt from 'jsonwebtoken';
import { Response, NextFunction } from "express";
import * as process from "process";
import { AuthenticatedRequest, User } from '../types';

const accessExpire = 2 * 60;
const refreshExpire = 10 * 60;

const getSecrets = (): { accessSecret: string, refreshSecret: string } => {
    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!accessSecret || !refreshSecret) {
        const errStr = !accessSecret ? "ACCESS_SECRET is not defined ! " : "";
        throw new Error(errStr + (!refreshSecret ? "REFRESH_SECRET is not defined !" : ""));
    }

    return {
        accessSecret,
        refreshSecret
    };
}

export const createTokens = (user: User) => {
    const { accessSecret, refreshSecret } = getSecrets();

    delete user.password;

    const accessToken = jwt.sign(user, accessSecret, { expiresIn: accessExpire });
    const refreshToken = jwt.sign(user, refreshSecret, { expiresIn: refreshExpire });

    return { accessToken, refreshToken, expiresIn: accessExpire, refreshExpiresIn: refreshExpire };
}

export const checkRefresh = (refreshToken: string) => {
    const { refreshSecret } = getSecrets();

    try {
        const jwtPayload = jwt.verify(refreshToken, refreshSecret);
        if (typeof jwtPayload == "string") {
            return {success: false, message: 'Invalid JWT token'};
        }

        return { success: true, payload: jwtPayload };
    } catch (error: any) {
        return { success: false, message: error.message }
    }
}

export const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) return res.status(401).json({ success: false, message: "No 'Authorization' header found !" });
    const authToken = bearerHeader.split(" ")[1];
    if (!authToken) return res.status(401).json({ success: false, message: "No token found in 'Authorization' header !" });

    const { accessSecret } = getSecrets();

    jwt.verify(authToken, accessSecret, (err: any, jwtPayload: any) => {
        if (err || !jwtPayload) {
            return res.status(401).json({ success: false, message: err ?? "Invalid payload" });
        }

        if (typeof jwtPayload == "string") {
            return res.status(401).json({ success: false, message: "Invalid JWT token" });
        }

        req.user = {
            email: jwtPayload.email,
            createdOn: jwtPayload.createdOn
        };

        next();
    });
    jwt.verify(authToken, accessSecret, (err, jwtPayload) => {
        if (err || !jwtPayload) {
            return res.status(401).json({ success: false, message: err ?? "Invalid payload" });
        }

        if (typeof jwtPayload == "string") {
            return res.status(401).json({ success: false, message: "Invalid JWT token" });
        }

        req.user = {
            email: jwtPayload.email,
            createdOn: jwtPayload.createdOn
        };

        next();
    });
}