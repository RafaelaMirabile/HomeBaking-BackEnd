import { transactionRepository } from "../repositories/transaction-repository.js"
import { TransactionWithId, Transactions } from "../utils/protocols.js";

async function createTransaction(userId: string, value: string, type: string, description: string): Promise<TransactionWithId> {
    const transaction: Transactions = {
        userId,
        value,
        type,
        description,
    };

    const createdTransaction = await transactionRepository.addTransaction(transaction);
    return createdTransaction;
}

async function getTransactionsOnFile(userId: string): Promise<TransactionWithId[]> {
    const transactions = await transactionRepository.fetchUserTransactions(userId);
    return transactions;
}

async function deleteTransactionOnFile(userId: string, transactionId: string): Promise<void> {
    await transactionRepository.deleteTransaction(userId, transactionId);
}

async function updateTransaction(userId: string, transactionId: string, updatedFields: Partial<TransactionWithId>): Promise<TransactionWithId> {
    const updatedTransaction = await transactionRepository.updateTransaction(userId, transactionId, updatedFields);
    return updatedTransaction;
}



export const transactionService = {
    createTransaction,
    getTransactionsOnFile,
    deleteTransactionOnFile,
    updateTransaction
};


