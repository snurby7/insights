import { CategoryGroupWithCategories } from 'ynab';

import { IMongoContract } from './IMongoContract';

export interface ICategoryGroupWithCategories extends IMongoContract, CategoryGroupWithCategories {}
