import { subscribeRepository } from "../repositories/subscribe-repository.js"

async function createUser(userName: string, userEmail: string, passwd: string) {
    const registratedUser = await subscribeRepository.registerUserOnFileSystem(userName, userEmail, passwd)
}

export const subscribeService = {
    createUser
}