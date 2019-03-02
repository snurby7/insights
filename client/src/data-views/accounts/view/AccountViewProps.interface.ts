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
}
