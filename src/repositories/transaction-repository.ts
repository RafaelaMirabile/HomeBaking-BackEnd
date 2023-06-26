import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { TransactionWithId, Transactions, TransactionsParams } from "../utils/protocols.js";

async function addTransaction(transaction: TransactionsParams): Promise<TransactionWithId> {
    const transactionsJSONFile = fs.readFileSync("fs/usersTransactions.json", "utf8");
    const transactionsArray: TransactionWithId[] = JSON.parse(transactionsJSONFile);

    const newTransaction: TransactionWithId = {
        ...transaction,
        transactionId: uuidv4(), // Generate a unique ID for the transaction
    };
    transactionsArray.push(newTransaction);
    const updatedTransactionsJSON = JSON.stringify(transactionsArray);
    fs.writeFileSync("fs/usersTransactions.json", updatedTransactionsJSON, "utf8");

    return newTransaction;
}

async function fetchUserTransactions(userId: string): Promise<TransactionWithId[]> {
    const transactionsJSONFile = fs.readFileSync("fs/usersTransactions.json", "utf8");
    const transactionsArray: TransactionWithId[] = JSON.parse(transactionsJSONFile);

    const userTransactions = transactionsArray.filter((transaction) => transaction.userId === userId);

    return userTransactions;
}
async function deleteTransaction(userId: string, transactionId: string): Promise<void> {
    const transactionsJSONFile = fs.readFileSync("fs/usersTransactions.json", "utf8");
    const transactionsArray: TransactionWithId[] = JSON.parse(transactionsJSONFile);

    const updatedTransactionsArray = transactionsArray.filter((transaction) => transaction.transactionId !== transactionId && transaction.userId === userId);

    const updatedTransactionsJSON = JSON.stringify(updatedTransactionsArray);
    fs.writeFileSync("fs/usersTransactions.json", updatedTransactionsJSON, "utf8");
}

async function updateTransaction(userId: string, transactionId: string, updatedFields: Partial<TransactionWithId>): Promise<TransactionWithId> {
    const transactionsJSONFile = fs.readFileSync("fs/usersTransactions.json", "utf8");
    const transactionsArray: TransactionWithId[] = JSON.parse(transactionsJSONFile);

    const updatedTransactionIndex = transactionsArray.findIndex((transaction) => transaction.transactionId === transactionId && transaction.userId === userId);

    if (updatedTransactionIndex !== -1) {
        transactionsArray[updatedTransactionIndex] = {
            ...transactionsArray[updatedTransactionIndex],
            ...updatedFields,
        };

        const updatedTransactionsJSON = JSON.stringify(transactionsArray);
        fs.writeFileSync("fs/transactions.json", updatedTransactionsJSON, "utf8");

        return transactionsArray[updatedTransactionIndex];
    } else {
        throw new Error("Transaction not found.");
    }
}


export const transactionRepository = {
    addTransaction,
    fetchUserTransactions,
    deleteTransaction,
    updateTransaction
}