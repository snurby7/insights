import { Account } from 'ynab';

import { IMongoInterface } from './mongo.interface';

export interface IAccount extends Account, IMongoInterface {
  // TODO need to put the budgetId onto the account when it is stored.
}
