import { loginRepository } from "../repositories/login-repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


async function signIn(userEmail: string, passwd: string) {

    const user = await getUserOrFail(userEmail);

    await validatePasswordOrFail(passwd, user.password);
    const token = await createSession(user.id);

    return {token}
}

async function getUserOrFail(userEmail: string) {
    const user = await loginRepository.findByEmail(userEmail);
    if (user === undefined) throw Error;
    return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw Error;
}

async function createSession(userId: string) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    await loginRepository.registerUserSession(userId, token);
    return token;
}


export const loginService = {
    signIn
}