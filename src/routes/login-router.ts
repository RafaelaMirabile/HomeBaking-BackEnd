import { ServerRoute } from "@hapi/hapi"
import { loginController } from "../controllers/login-controller.js"


export const loginRouter: ServerRoute[] = [
    {
        method: "POST",
        path: "/login",
        handler: loginController.loginInPost
    }
]