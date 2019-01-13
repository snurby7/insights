import { InsightRoutes } from '../common/api-routes';
import { IMonthlyExpenseRequest } from '../contracts/monthly-expense-request.interface';
import ApiUtility from '../utilities/api-utility';

const YnabAgent = {
  getBudgetYears(budgetId: string): Promise<number[]> {
    return ApiUtility.getRequest(InsightRoutes.getBudgetYears, {budgetId});
  },

  getBudgets(): Promise<any> {
    return ApiUtility.getRequest(InsightRoutes.getBudgets);
  },

  getAccounts(budgetId: string): Promise<any> {
    return ApiUtility.getRequest(InsightRoutes.getAccounts, {budgetId});
  },

  getTransactionsByPayee(payeeId: string): Promise<any> {
    return ApiUtility.getRequest(InsightRoutes.getTransactionsByPayee, {payeeId});
  },

  getPayeesByBudgetId(budgetId: string): Promise<any> {
    return ApiUtility.getRequest(InsightRoutes.getPayees, {budgetId});
  },

  getCategoriesByBudgetId(budgetId: string): Promise<any> {
    return ApiUtility.getRequest(InsightRoutes.getCategories, {budgetId});
  },

  getTransactionsByDay(budgetId: string): Promise<any> {
    return ApiUtility.getRequest(InsightRoutes.getTransactionsByDay, {budgetId});
  },

  getReportForMonthlyExpenses(request: IMonthlyExpenseRequest): Promise<any> {
    return ApiUtility.getRequest(InsightRoutes.reportsMonthly, request);
  }
};

export default YnabAgent;
