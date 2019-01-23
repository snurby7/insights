import { CategoryGroupWithCategories } from 'ynab';

import { IMongoInterface } from './mongo.interface';

export interface ICategory extends IMongoInterface, CategoryGroupWithCategories {}
