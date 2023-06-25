import { authenticationRepository } from "../repositories/authentication-repository.js";

async function verifySession(token: string){
    const userSession = await  authenticationRepository.findUserSessionByToken(token);
    
    if(userSession === undefined){
        throw new Error("Erro ao tentar obter usuário através da sessão");
    }
    
    return(userSession);
}

async function verifyUserById(userId: string){
    const userSession = await  authenticationRepository.findUserById(userId);
    
    if(userSession === undefined){
        throw new Error("Erro ao tentar obter usuário através da sessão");
    }
    
    return(userSession);
}

export const authenticationService  ={
    verifySession,
    verifyUserById
}