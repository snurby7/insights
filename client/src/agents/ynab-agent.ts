import { InsightRoutes } from '../common/api-routes';
import { IAccount } from '../contracts/account.interface';
import { IBudget } from '../contracts/budget.interface';
import { ICategory } from '../contracts/category.interface';
import { IMonthlyExpenseRequest } from '../contracts/monthly-expense-request.interface';
import { IPayee } from '../contracts/payee.interface';
import { ITransaction } from '../contracts/transaction.interface';
import { ITransactionsAggregate } from '../contracts/transactions-aggregate.interface';
import ApiUtility from '../utilities/api-utility';

const YnabAgent = {
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

  getCategoriesByBudgetId(budgetId: string): Promise<ICategory[]> {
    return ApiUtility.getRequest(InsightRoutes.getCategories, { budgetId });
  },

  getTransactionsByDay(budgetId: string): Promise<ITransactionsAggregate[]> {
    return ApiUtility.getRequest(InsightRoutes.getTransactionsByDay, { budgetId });
  },

  // ? this one is going to need some thought on how to type it or refactor it.
  getReportForMonthlyExpenses(request: IMonthlyExpenseRequest): Promise<any> {
    return ApiUtility.getRequest(InsightRoutes.reportsMonthly, request);
  },
};

export default YnabAgent;
