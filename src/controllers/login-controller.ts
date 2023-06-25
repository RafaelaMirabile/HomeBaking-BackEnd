import { Request, ResponseToolkit, ResponseObject, ServerRoute } from "@hapi/hapi"
import { loginService } from "../service/login-service.js";

async function loginInPost(req: Request, h: ResponseToolkit) {
    const { userEmail, passwd } = req.payload as { userEmail: string, passwd: string };

    try {
        const result = await loginService.signIn(userEmail, passwd);
        return h.response().code(200);
    } catch (error) {
        console.log(error);
        //   return res.status(httpStatus.UNAUTHORIZED).send({});
    }

}

export const loginController = {
    loginInPost
}