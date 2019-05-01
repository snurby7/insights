import {
  IAccount,
  IBudget,
  ICategoryGroupWithCategories,
  IMonthlyExpenseRequest,
  IPayee,
  ITransaction,
  ITransactionsAggregate,
} from '../contracts';
import { ApiUtility } from '../utilities';
import { InsightRoutes } from './routes';

export const YnabAgent = {
  getAccountDetails(accountId: string, budgetId: string): Promise<ITransaction[]> {
    return ApiUtility.getRequest(InsightRoutes.getAccountDetails, { accountId, budgetId });
  },

  getBudgetYears(budgetId: string): Promise<number[]> {
    return ApiUtility.getRequest(InsightRoutes.getBudgetYears, { budgetId });
  },

  getBudgets(): Promise<IBudget[]> {
    return ApiUtility.getRequest(InsightRoutes.getBudgets);
  },

  getAccounts(budgetId: string): Promise<IAccount[]> {
    return ApiUtility.getRequest(InsightRoutes.getAccounts, { budgetId });
  },

  getTransactionsByPayee(payeeId: string): Promise<ITransaction[]> {
    return ApiUtility.getRequest(InsightRoutes.getTransactionsByPayee, { payeeId });
  },

  getPayeesByBudgetId(budgetId: string): Promise<IPayee[]> {
    return ApiUtility.getRequest(InsightRoutes.getPayees, { budgetId });
  },

  getCategoriesByBudgetId(budgetId: string): Promise<ICategoryGroupWithCategories[]> {
    return ApiUtility.getRequest(InsightRoutes.getCategories, { budgetId });
  },

  getTransactionsByDay(budgetId: string): Promise<ITransactionsAggregate[]> {
    return ApiUtility.getRequest(InsightRoutes.getTransactionsByDay, { budgetId });
  },

  // ! TODO: https://github.com/snurby7/insights/issues/27
  getReportForMonthlyExpenses(request: IMonthlyExpenseRequest): Promise<any> {
    return ApiUtility.getRequest(InsightRoutes.reportsMonthly, request, true);
  },
};
