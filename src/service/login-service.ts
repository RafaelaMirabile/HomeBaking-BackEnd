import { loginRepository } from "../repositories/login-repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from "../errors/unauthorized-error.js";


async function signIn(params: SignInParams): Promise<SignInResult> {
    const user = await getUserOrFail(params.userEmail);
    const password = user[0].password;

    await validatePasswordOrFail(params.passwd, password);
    const token = await createSession(user.id);

    return { token }
}

async function getUserOrFail(userEmail: string) {
    const user = await loginRepository.findByEmail(userEmail);
    if (user === undefined) throw invalidCredentialsError();
    return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
    console.log(password, userPassword);
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw invalidCredentialsError();
}

async function createSession(userId: string) {
    console.log(process.env.JWT_SECRET)
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    await loginRepository.registerUserSession(userId, token);
    return token;
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