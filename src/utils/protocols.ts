export interface Transactions {
  userId: string;
  value: string;
  type: string;
  description: string;
}

export type TransactionWithId = Transactions & {
  transactionId: string;
};

export type TransactionsParams = Pick<Transactions, "userId" | "value" | "type" | "description">;
