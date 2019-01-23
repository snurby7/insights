import { BudgetSummary } from 'ynab';

import { IMongoInterface } from './mongo.interface';

export interface IBudget extends BudgetSummary, IMongoInterface {}
