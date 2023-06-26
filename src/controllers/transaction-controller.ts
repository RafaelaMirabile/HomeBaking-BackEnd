import { Request, ResponseToolkit } from "@hapi/hapi"
import { TransactionsParams, transactionService } from "../service/transactions-service.js"

async function getTransactions() {

}

async function registerTransaction(req: Request, h: ResponseToolkit) {
    const { value, type } = req.payload as TransactionsParams;
    const { user } = req.user;
    const userId = user.userId;
    const record = transactionService.registerTransactionOnFile({ userId, value, type })
}

async function updateRecord() {

}

async function deleteRecord() {

}

export const transactionController = {
    getTransactions,
    updateRecord,
    deleteRecord,
    registerTransaction
}