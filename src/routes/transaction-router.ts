import { ServerRoute } from "@hapi/hapi";
import { transactionController } from "../controllers/transaction-controller.js";
import { ensureAuth } from "../middlewares/authentication-middleware.js";

export const transactionsRouter: ServerRoute[] = [
    {
        method: "GET",
        path: "/funds/:userId",
        options: {
            pre: [{ method: ensureAuth }]
          },
        handler: transactionController.getTransactionsByUserId
    },
    {
      method: "POST",
      path: "/funds/:userId",
      options: {
          pre: [{ method: ensureAuth }]
        },
      handler: transactionController.registerTransaction
  },
    {
        method: "PUT",
        path: "/funds/:transactionId",
        options: {
            pre: [{ method: ensureAuth }]
          },
        handler: transactionController.updateTransaction
    },
    {
        method: "DELETE",
        path: "/funds/:transactionId",
        options: {
            pre: [{ method: ensureAuth }]
          },
        handler: transactionController.deleteRecord
    }
]