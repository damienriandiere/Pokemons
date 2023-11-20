import jwt from 'jsonwebtoken';
import { Response, NextFunction } from "express";
import * as process from "process";
import { AuthenticatedRequest, User } from '../types';
const logger = require('../loggers/loggers');

const accessExpire = 2 * 60;
const refreshExpire = 10 * 60;

const getSecrets = (): { accessSecret: string, refreshSecret: string } => {
    logger.info('getSecrets')
    const accessSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!accessSecret || !refreshSecret) {
        const errStr = !accessSecret ? "ACCESS_SECRET is not defined ! " : "";
        logger.error('Tokens secret is not defined !');
        throw new Error(errStr + (!refreshSecret ? "REFRESH_SECRET is not defined !" : ""));
    }
    logger.info('Tokens secret is defined !')
    return {
        accessSecret,
        refreshSecret
    };
}

export const createTokens = (user: User) => {
    logger.info('createTokens')
    const { accessSecret, refreshSecret } = getSecrets();

    delete user.password;
    logger.info('User password deleted')

    const accessToken = jwt.sign(user, accessSecret, { expiresIn: accessExpire });
    const refreshToken = jwt.sign(user, refreshSecret, { expiresIn: refreshExpire });
    logger.info('Tokens created')

    return { accessToken, refreshToken, expiresIn: accessExpire, refreshExpiresIn: refreshExpire };
}

export const checkRefresh = (refreshToken: string) => {
    logger.info('checkRefresh')
    const { refreshSecret } = getSecrets();

    try {
        const jwtPayload = jwt.verify(refreshToken, refreshSecret);
        if (typeof jwtPayload == "string") {
            logger.warn('Invalide JWT token')
            return { success: false, message: 'Invalid JWT token' };
        }
        logger.info('JWT token est valide.')
        return { success: true, payload: jwtPayload };
    } catch (error: any) {
        logger.error(error.message)
        return { success: false, message: error.message }
    }
}

export const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    logger.info('isAuthenticated')
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader){
        logger.error('No Authorization header found !')
        return res.status(401).json({ success: false, message: "No 'Authorization' header found !" });
    } 
    const authToken = bearerHeader.split(" ")[1];
    if (!authToken){
        logger.error('No token found in Authorization header !')
        return res.status(401).json({ success: false, message: "No token found in 'Authorization' header !" });
    }

    const { accessSecret } = getSecrets();

    jwt.verify(authToken, accessSecret, (err: any, jwtPayload: any) => {
        if (err || !jwtPayload) {
            logger.error(err ?? "Payload invalide")
            return res.status(401).json({ success: false, message: err ?? "Payload invalide" });
        }

        if (typeof jwtPayload == "string") {
            logger.error('JWT token invalide')
            return res.status(401).json({ success: false, message: "JWT token invalide" });
        }

        req.user = {
            email: jwtPayload.email,
            createdOn: jwtPayload.createdOn
        };

        next();
    });
    jwt.verify(authToken, accessSecret, (err, jwtPayload) => {
        if (err || !jwtPayload) {
            logger.error(err ?? "Payload invalide")
            return res.status(401).json({ success: false, message: err ?? "Payload invalide" });
        }

        if (typeof jwtPayload == "string") {
            logger.error('JWT token invalide')
            return res.status(401).json({ success: false, message: "JWT token invalide" });
        }

        req.user = {
            email: jwtPayload.email,
            createdOn: jwtPayload.createdOn
        };

        next();
    });
}