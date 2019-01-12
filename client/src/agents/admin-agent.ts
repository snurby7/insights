import InsightRoutes from '../common/api-routes';
import ApiUtility from '../utilities/api-utility';

// TODO type all of these returns with their interface not any
const AdminAgent = {
  getBudgets(): Promise<any> {
    return ApiUtility.getRequest(InsightRoutes.getBudgets);
  },
  updatePayees(budgetId: string): Promise<any> {
    return ApiUtility.postRequest(InsightRoutes.adminUpdatePayees, {budgetId});
  },
  updateAccounts(budgetId: string): Promise<any> {
    return ApiUtility.postRequest(InsightRoutes.adminUpdateAccounts, {budgetId});
  },
  udateTransactions(budgetId: string): Promise<any> {
    return ApiUtility.postRequest(InsightRoutes.postUpdateTransactions, {budgetId});
  },
  updateCategories(budgetId: string): Promise<any> {
    return ApiUtility.postRequest(InsightRoutes.adminUpdateCategories, {budgetId});
  },
  updateBudgets(budgetId: string): Promise<any> {
    return ApiUtility.postRequest(InsightRoutes.adminUpdateBudgets, {budgetId});
  }
};
export default AdminAgent;
