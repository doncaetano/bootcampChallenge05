import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      x => x.type === 'income',
    );

    let incomes = 0;
    if (incomeTransactions.length > 0) {
      incomes = incomeTransactions.reduce((income, transaction) => {
        return income + transaction.value;
      }, 0);
    }

    const outcomeTransactions = this.transactions.filter(
      x => x.type === 'outcome',
    );

    let outcomes = 0;
    if (outcomeTransactions.length > 0) {
      outcomes = outcomeTransactions.reduce((outcome, transaction) => {
        return outcome + transaction.value;
      }, 0);
    }

    const total = incomes - outcomes;
    const balance = { income: incomes, outcome: outcomes, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
