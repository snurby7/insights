/**
 * @description Interface for the category-view.tsx
 * @interface ICategoryViewProps
 */
export interface ICategoryViewProps {
  /**
   * @description The selected categoryId
   * @type {string} The string categoryId, similar to a GUID
   * @memberof ICategoryViewProps
   */
  categoryId: string;
  /**
   * @description The budgetId for the current redux state
   * @type {string} Need the budgetId on here to filter down the transactions to the current budgetId
   * @memberof ICategoryViewProps
   */
  budgetId: string;
}
