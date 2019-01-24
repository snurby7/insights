import { Payee } from 'ynab';

import { IMongoInterface } from './mongo.interface';

export interface IPayee extends IMongoInterface, Payee {}
