import ApiUtility from "../utilities/api-utility";
import InsightRoutes from "../common/api-routes";

const AdminAgent = {
  async getBudgets() {
    const budgets = await ApiUtility.getRequest(InsightRoutes.getBudgets);
    return budgets;
  },
  async updatePayees(budgetId) {
    const result = await ApiUtility.postRequest(InsightRoutes.adminUpdatePayees, {budgetId});
    return result;
  },
  async updateAccounts(budgetId) {
    const result = await ApiUtility.postRequest(InsightRoutes.adminUpdateAccounts, {budgetId});
    return result;
  },
  async udateTransactions(budgetId) {
    const result = await ApiUtility.postRequest(InsightRoutes.postUpdateTransactions, {budgetId});
    return result;
  },
  async updateCategories(budgetId) {
    const result = await ApiUtility.postRequest(InsightRoutes.adminUpdateCategories, {budgetId});
    return result;
  },
  async updateBudgets(budgetId) {
    const result = await ApiUtility.postRequest(InsightRoutes.adminUpdateBudgets, {budgetId});
    return result;
  }
};
export default AdminAgent;
