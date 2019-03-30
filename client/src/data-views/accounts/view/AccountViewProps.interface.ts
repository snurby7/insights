/**
 * @description The props used by the account view component
 * @interface IAccountViewProps
 */
export interface IAccountViewProps {
  /**
   * @description The account Id from YNAB
   * @type {string} Needs to be a known accountId for YNAB and then it finds it in Mongo
   * @memberof IAccountViewProps
   */
  accountId: string;
  /**
   * @description The budgetId for the current redux state
   * @type {string} Need the budgetId on here to filter down the transactions to the current budgetId
   * @memberof IAccountViewProps
   */
  budgetId: string;
}
