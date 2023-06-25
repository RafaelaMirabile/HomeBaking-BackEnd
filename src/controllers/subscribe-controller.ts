import { Request, ResponseToolkit, ResponseObject, ServerRoute } from "@hapi/hapi"
import { SignUpParams, subscribeService } from "../service/subscribe-service.js";

async function registerUser(req: Request, h: ResponseToolkit) {
    const { userName, userEmail, passwd } = req.payload as SignUpParams;
    
    try {
        const userRegistrated = await subscribeService.createUser({ userName, userEmail, passwd });
        return h.response(userRegistrated).code(201)
    } catch (error) {
        console.log(error);
        if (error.name === "DuplicatedEmailError") {
            return h.response(error).code(409);
        }
        return h.response(error).code(500);
    }
}

export const subscribeController = {
    registerUser
}