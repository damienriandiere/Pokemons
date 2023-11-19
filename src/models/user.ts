import {User} from "../types";

const users: User[] = [
    { email: "jean-michel@live.fr", password: "1234", createdOn: "2023-10-11--11:00" }
]

export const getUserByEmail = (email: string) => {
    return users.find(user => user.email === email);
}