import { ServerRoute } from "@hapi/hapi";
import { transactionController } from "../controllers/transaction-controller.js";
import { ensureAuth } from "../middlewares/authentication-middleware.js";

export const transactionsRouter: ServerRoute[] = [
    {
        method: "GET",
        path: "/funds",
        options: {
            pre: [{ method: ensureAuth }]
          },
        handler: transactionController.getTransactions
    },
    {
      method: "POST",
      path: "/funds",
      options: {
          pre: [{ method: ensureAuth }]
        },
      handler: transactionController.registerTransaction
  },
    {
        method: "PUT",
        path: "/funds",
        options: {
            pre: [{ method: ensureAuth }]
          },
        handler: transactionController.updateRecord
    },
    {
        method: "DELETE",
        path: "/funds",
        options: {
            pre: [{ method: ensureAuth }]
          },
        handler: transactionController.deleteRecord
    }
]