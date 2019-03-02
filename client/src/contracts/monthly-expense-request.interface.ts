/**
 * @description The monthly expense report request object with a few properites to narrow it down
 * @interface IMonthlyExpenseRequest
 */
export interface IMonthlyExpenseRequest {
  /**
   * @type {number} The starting month
   * @memberof IMonthlyExpenseRequest
   */
  startingMonth: number;
  /**
   * @type {number} The starting year
   * @memberof IMonthlyExpenseRequest
   */
  startingYear: number;
  /**
   * @type {string} The budget Id string
   * @memberof IMonthlyExpenseRequest
   */
  budgetId: string;
}
