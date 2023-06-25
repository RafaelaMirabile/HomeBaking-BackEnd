import { invalidIdCredention, invalidTokenCredential } from "../errors/unauthorized-error.js";
import { authenticationRepository } from "../repositories/authentication-repository.js";

async function verifySession(token: string) {
    const userSession = await authenticationRepository.findUserSessionByToken(token);

    if (userSession === undefined) {
        throw invalidTokenCredential();
    }

    return (userSession);
}

async function verifyUserById(userId: string) {
    const userSession = await authenticationRepository.findUserById(userId);

    if (userSession === undefined) {
        throw invalidIdCredention();
    }

    return (userSession);
}

export const authenticationService = {
    verifySession,
    verifyUserById
}