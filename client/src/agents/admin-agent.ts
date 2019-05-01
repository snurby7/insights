import { ApiUtility } from '../utilities';
import { InsightRoutes } from './routes';

export const AdminAgent = {
  updatePayees(budgetId: string): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.syncPayees, { budgetId });
  },
  updateAccounts(budgetId: string): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.syncAccounts, { budgetId });
  },
  udateTransactions(budgetId: string): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.syncTransactions, { budgetId });
  },
  updateCategories(budgetId: string): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.syncCategories, { budgetId });
  },
  updateBudgets(budgetId: string): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.syncBudgets, { budgetId });
  },
};
