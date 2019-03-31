import { CategoryGroupWithCategories } from 'ynab';

import { IMongoInterface } from './mongo.interface';

export interface ICategoryGroupWithCategories extends IMongoInterface, CategoryGroupWithCategories {}
