import { Payee } from 'ynab';

import { IMongoContract } from './IMongoContract';

export interface IPayee extends IMongoContract, Payee {}
