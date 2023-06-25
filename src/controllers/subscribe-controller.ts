import { Request, ResponseToolkit, ResponseObject, ServerRoute } from "@hapi/hapi"
import { subscribeService } from "../service/subscribe-service.js";

async function registerUser(req: Request, h: ResponseToolkit) {
    const { userName, userEmail, passwd } = req.payload as { userName: string, userEmail: string, passwd: string };

    try {
        const userRegistrated = await subscribeService.createUser(userName, userEmail, passwd);
    } catch (error) {
        console.log(error.message);
        return h.response().code(500);
    }

}

export const subscribeController = {
    registerUser
}