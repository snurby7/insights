import ApiUtility from "../utilities/api-utility";
import InsightRoutes from "../common/api-routes";

const YnabAgent = {
  async getBudgets() {
    return await ApiUtility.getRequest(InsightRoutes.getBudgets);
  },

  async getAccounts(request) {
    return await ApiUtility.getRequest(InsightRoutes.getAccounts, request);
  },

  async getTransactionsByPayee(payeeId) {
    return await ApiUtility.getRequest(InsightRoutes.getTransactionsByPayee, {payeeId});
  },

  async getPayeesByBudgetId(budgetId) {
    return await ApiUtility.getRequest(InsightRoutes.getPayees, {budgetId});
  },

  async getCategoriesByBudgetId(budgetId) {
    return await ApiUtility.getRequest(InsightRoutes.getCategories, {budgetId});
  },

  async getTransactionsByDay(budgetId) {
    return await ApiUtility.getRequest(InsightRoutes.getTransactionsByDay, {budgetId});
  },

  async getReportForMonthlyExpenses(request) {
    return await ApiUtility.getRequest(InsightRoutes.reportsMonthly, request);
  }
};

export default YnabAgent;
