import fs from 'fs';

async function findByEmail(email: string) {
  const usersJSON = fs.readFileSync("fs/users.json", "utf8");
  const users = JSON.parse(usersJSON);

  return users.filter((users: any) => users.email === email);

}

async function registerUserSession(id: string, token: string) {
  const data = {
    userId: id,
    token: token
  };

  let usersSessionFile = fs.readFileSync("fs/usersSessions.json", "utf8");
  console.log(usersSessionFile.length);

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
