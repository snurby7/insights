import { InsightRoutes } from '../common/api-routes';
import ApiUtility from '../utilities/api-utility';

const AdminAgent = {
  updatePayees(budgetId: string): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.adminUpdatePayees, { budgetId });
  },
  updateAccounts(budgetId: string): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.adminUpdateAccounts, { budgetId });
  },
  udateTransactions(budgetId: string): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.postUpdateTransactions, { budgetId });
  },
  updateCategories(budgetId: string): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.adminUpdateCategories, { budgetId });
  },
  updateBudgets(budgetId: string): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.adminUpdateBudgets, { budgetId });
  },
};
export default AdminAgent;
