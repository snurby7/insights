/**
 * @description A base props for all of the category viewing components
 *
 * @export
 * @interface ICategoryComponentProps
 */
export interface ICategoryComponentProps {
  /**
   * @description The budgetId that is being used
   * @type {string}
   * @memberof ICategoryComponentProps
   */
  budgetId: string;
  /**
   * @description The categoryId that is being viewed.
   * @type {string}
   * @memberof ICategoryComponentProps
   */
  categoryId: string;
}
