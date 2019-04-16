import { Category } from 'ynab';

export interface ICategoryItemProps extends Category {
  /**
   * @description This is the ID of the biggest spending category in a given group
   * @memberof ICategoryItemProps
   */
  biggestCategoryId: string;
}
