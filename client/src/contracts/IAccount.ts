import { Account } from 'ynab';

import { IMongoContract } from './IMongoContract';

export interface IAccount extends Account, IMongoContract {
  // TODO need to put the budgetId onto the account when it is stored.
}
