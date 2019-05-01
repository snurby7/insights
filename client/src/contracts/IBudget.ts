import { BudgetSummary } from 'ynab';

import { IMongoContract } from './IMongoContract';

export interface IBudget extends BudgetSummary, IMongoContract {}
