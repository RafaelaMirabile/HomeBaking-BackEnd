import { ApplicationError } from "../utils/protocols.js";

export function unauthorizedError(): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect",
  };
}

export function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
  };
}

export function invalidTokenCredential(): ApplicationError {
  return {
    name: "UnexistingUserToken",
    message: "Session not found with given token",
  };
}

export function invalidIdCredention(): ApplicationError {
  return {
    name: "InvalidIdCRedentionError",
    message: "User not found with given userId",
  };
}

