import fs from 'fs';

async function findByEmail(email: string) {
  const usersJSONFile = fs.readFileSync("fs/users.json", "utf8");
  const usersArray = JSON.parse(usersJSONFile);
  const user = usersArray.filter((users: any) => users.email === email);
  
  return user;

}

async function registerUserSession(id: string, token: string) {
  const data = {
    userId: id,
    token: token
  };

  let usersSessionFile = fs.readFileSync("fs/usersSessions.json", "utf8");

  if (usersSessionFile.length === 0) {
    fs.writeFileSync("fs/usersSessions.json", JSON.stringify([data]), 'utf8');
    return; // Return early after writing the first session data
  }

  let usersSession = JSON.parse(usersSessionFile);
  const arr = Array.from(usersSession);
  arr.push(data);
  usersSessionFile = JSON.stringify(arr);
  console.log(usersSessionFile);
  fs.writeFileSync("fs/usersSessions.json", usersSessionFile, "utf8");
}

export const loginRepository = {
  findByEmail,
  registerUserSession
};
