import fs from 'fs';
import bcrypt from 'bcrypt';

async function registerUserOnFileSystem(userName: string, userEmail: string, passwd: string) {
    const passwordHash = bcrypt.hashSync(passwd, 12);
  
    const randomId = function (length = 6) {
      return Math.random().toString(36).substring(2, length + 2);
    };
  
    const data = {
      id: randomId(),
      user: userName,
      email: userEmail,
      password: passwordHash
    };
  
    let usersJSON = fs.readFileSync("fs/users.json", "utf8");
  
    if (usersJSON.length === 0) {
      fs.writeFileSync("fs/users.json", JSON.stringify([data]), 'utf8');
    } else {
      let users = JSON.parse(usersJSON);
      const arr = Array.from(users);
      arr.push(data);
      usersJSON = JSON.stringify(arr);
      fs.writeFileSync("fs/users.json", usersJSON, "utf8");
    }
  
    return { id: randomId(), user: userName, email: userEmail, passwd: passwordHash };
  }
  


async function findByEmail(email: string) {
    const usersJSON = fs.readFileSync("fs/users.json", "utf8");
  
    if (usersJSON.length === 0) {
      return null; // Return null or any other appropriate value when the file is empty
    }
  
    const users = JSON.parse(usersJSON);
    const user = users.find((user: any) => user.email === email);
    return user || null; // Return null if user is not found
  }
  
  
      


export const subscribeRepository = {
    registerUserOnFileSystem,
    findByEmail
}