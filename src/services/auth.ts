import jwt from 'jsonwebtoken';
import * as fs from "fs";

const pathUsers = process.env.PATH_USERS;

function generateAccessToken(mail : string) {
    return jwt.sign({email : mail}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
}

function generateRefreshToken(mail : string) {
    return jwt.sign({email : mail}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
}

export function login(email: string){
    const users = JSON.parse(fs.readFileSync(pathUsers).toString());
    const search = users.find((user : any) => user.email === email);
    if (search === undefined) {
        return false;
    } else {
        const accessToken = generateAccessToken(email);
        const refreshToken = generateRefreshToken(email);
        return {accessToken, refreshToken};
    }
}