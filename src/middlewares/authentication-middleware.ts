import Boom from '@hapi/boom';
import { Request, ResponseToolkit } from '@hapi/hapi';
import { authenticationService } from '../service/authentication-service.js';

export async function ensureAuth(req: Request, h: ResponseToolkit) {

  const token = req.headers.authorization.replace('Bearer ', '');

  if (!token) {
    return Boom.unauthorized('Token undefined');
  }

  try {
    const session = await authenticationService.verifySession(token);
    const user = await authenticationService.verifyUserById(session.userId);
    delete user.Userpassword;
    req.user = user;
    return h.continue;

  } catch (error) {
    console.log(error);
    if (error.name === "UnexistingUserToken" || error.name === "InvalidIdCRedentionError") {
      return h.response(error).code(409);
    }
    return h.response(error).code(500);
  }

}

