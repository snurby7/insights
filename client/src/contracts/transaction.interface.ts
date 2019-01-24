import { TransactionDetail } from 'ynab';

import { IMongoInterface } from './mongo.interface';

export interface ITransaction extends TransactionDetail, IMongoInterface {
  budgetId: string;
}
