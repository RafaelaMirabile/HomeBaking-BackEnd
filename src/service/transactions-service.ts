import { transactionRepository } from "../repositories/transaction-repository"

async function registerTransactionOnFile(params:Transactions) {
  /*  const recordRegistrated = transactionRepository.addTransaction();
    console.log(recordRegistrated);*/
}


export type Transactions = {
    userId: string,
    value: string,
    type: string
}
export type TransactionsParams = Pick<Transactions, "userId" | "value" | "type"> 

export const transactionService ={
    registerTransactionOnFile
}