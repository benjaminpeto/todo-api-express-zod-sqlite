import bcrypt from "bcrypt";

export const getHashedPassword = (password: string, saltRounds: number = 10) => {
    return bcrypt.hash(password, saltRounds);
};
