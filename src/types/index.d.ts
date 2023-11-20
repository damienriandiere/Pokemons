import { Request } from "express";

export interface UserDTO {
    email: string;
    password?: string;
}

export interface User extends UserDTO {
    createdOn: string;
}

export interface AuthenticatedRequest extends Request {
    user?: User;
}