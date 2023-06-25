import { duplicatedEmailError } from "../errors/unauthorized-error.js";
import { loginRepository } from "../repositories/login-repository.js";
import { subscribeRepository } from "../repositories/subscribe-repository.js"

async function createUser(params: SignUpParams) : Promise<RegistratedUser>{
    await validateUniqueEmailOrFail(params.userEmail);
    
    return await subscribeRepository.registerUserOnFileSystem(params.userName, params.userEmail, params.passwd)

}

async function validateUniqueEmailOrFail(email: string) {
    const userWithSameEmail = await loginRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw duplicatedEmailError();
    }
  }

export type RegistratedUser = {
    id:string,user:string,email:string,passwd:string
}
export type UsertoRegister = {
    userEmail: string, passwd: string, userName: string
}
export type SignUpParams = Pick< UsertoRegister,"userName"| "userEmail" | "passwd">;

export const subscribeService = {
    createUser
}