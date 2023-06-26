import { Request, ResponseToolkit } from "@hapi/hapi"
import { TransactionWithId, TransactionsParams } from "../utils/protocols.js";
import { transactionService } from "../service/transactions-service.js";

async function getTransactionsByUserId(req: Request, h: ResponseToolkit) {
    const { userId } = req.params;

    try {
        const transactions = await transactionService.getTransactionsOnFile(userId);
        return h.response(transactions).code(200);
    } catch (error) {
        console.log(error);
        return h.response(error).code(500);
    }
}


async function registerTransaction(req: Request, h: ResponseToolkit) {
    const { value, type, description } = req.payload as TransactionsParams;
    const { userId } = req.params;

    try {
        const transaction = await transactionService.createTransaction(userId, value, type, description);
        return h.response(transaction).code(200);
    } catch (error) {
        console.log(error);
        return h.response(error).code(500);
    }
}

async function updateTransaction(req: Request, h: ResponseToolkit) {
    const { value, description } = req.payload as TransactionWithId;
    const { transactionId } = req.params;
    const userId = req.auth.credentials.userId as string;

    try {
        const updatedFields = { value, description };
        const updatedTransaction = await transactionService.updateTransaction(userId, transactionId, updatedFields);
        return h.response(updatedTransaction).code(200);
    } catch (error) {
        console.log(error);
        return h.response(error).code(500);
    }
}

async function deleteRecord(req: Request, h: ResponseToolkit) {
    const { transactionId } = req.params;
    const userId = req.auth.credentials.userId as string;

    try {
        await transactionService.deleteTransactionOnFile(userId, transactionId);
        return h.response().code(204);
    } catch (error) {
        console.log(error);
        return h.response(error).code(500);
    }
}



export const transactionController = {
    getTransactionsByUserId,
    updateTransaction,
    deleteRecord,
    registerTransaction
}