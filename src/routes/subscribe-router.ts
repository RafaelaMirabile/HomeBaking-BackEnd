import { ServerRoute } from "@hapi/hapi"
import { subscribeController } from "../controllers/subscribe-controller.js"

export const subscribeRouter: ServerRoute[] = [
    {
        method: "POST",
        path: "/subscribe",
        handler: subscribeController.registerUser
    }
]