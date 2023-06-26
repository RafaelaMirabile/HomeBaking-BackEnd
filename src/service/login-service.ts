import { loginRepository } from "../repositories/login-repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from "../errors/unauthorized-error.js";


async function signIn(params: SignInParams): Promise<SignInResult> {
    const user = await getUserOrFail(params.userEmail);
    const password = user[0].password;

    await validatePasswordOrFail(params.passwd, password);
    const register = await createSession(user[0].id);

    return register;
}

async function getUserOrFail(userEmail: string) {
    const user = await loginRepository.findByEmail(userEmail);
    if (user === undefined) throw invalidCredentialsError();
    return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw invalidCredentialsError();
}

async function createSession(userId: string) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    const userSession = await loginRepository.registerUserSession(userId, token);
    return userSession;
}
export type User = {
    userEmail: string, passwd: string
}
export type SignInParams = Pick<User, "userEmail" | "passwd">;

type SignInResult = {
    token: string;
};

export const loginService = {
    signIn
}