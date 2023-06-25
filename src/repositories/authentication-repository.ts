import fs from 'fs'

async function findUserSessionByToken(token: string) {
    const sessionsJSONFile = fs.readFileSync("fs/userSessions.json", "utf8");
    const users = JSON.parse(sessionsJSONFile);

    return users.filter((users: any) => users.token === token).pop();
}

async function findUserById(userId: string) {
   
    const usersJSON = fs.readFileSync("fs/users.json", "utf8");
    const users = JSON.parse(usersJSON);

    return users.filter((users: any) => users.userId === userId).pop();

}

export const authenticationRepository={
    findUserSessionByToken,
    findUserById
}