import { TransactionDetail } from 'ynab';

import { IMongoContract } from './IMongoContract';

export interface ITransaction extends TransactionDetail, IMongoContract {
  budgetId: string;
}
