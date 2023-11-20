import { User } from "../types";
const logger = require('../loggers/loggers');

const users: User[] = [
    { email: "jean-michel@live.fr", password: "1234", createdOn: "2023-10-11--11:00" }
]

export const getUserByEmail = (email: string) => {
    logger.info('getUserByEmail')
    return users.find(user => user.email === email);
}