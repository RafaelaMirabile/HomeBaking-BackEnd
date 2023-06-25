import { Request, ResponseToolkit, ResponseObject, ServerRoute } from "@hapi/hapi"
import { SignInParams, loginService } from "../service/login-service.js";

async function loginInPost(req: Request, h: ResponseToolkit) {
    const { userEmail, passwd } = req.payload as SignInParams;

    try {
        const result = await loginService.signIn({userEmail, passwd});
        return h.response(result).code(200);
    } catch (error) {
        console.log(error);
        return h.response(error).code(401);
    }

}

export const loginController = {
    loginInPost
}