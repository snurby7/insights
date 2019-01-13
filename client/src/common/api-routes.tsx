export enum InsightRoutes {
  addUser = '/api/users/add',
  adminUpdateAccounts =  "/api/admin/update/accounts",
  adminUpdateBudgets =  "/api/admin/update/budgets",
  adminUpdateCategories =  "/api/admin/update/categories",
  adminUpdatePayees =  "/api/admin/update/payees",
  getAccounts =  "/api/accounts",
  getAllTransactions =  "/api/transactions/all",
  getBudgets =  "/api/budgets",
  getBudgetYears =  "/api/budget/years",
  getCategories =  "/api/categories",
  getPayees =  "/api/payees",
  getTransactionsByDay =  "/api/transactions/aggregate",
  getTransactionsByPayee =  "/api/transactions/payee",
  postUpdateTransactions =  "/api/admin/update/transactions",
  reportsMonthly = '/api/reports/monthly',
  users = '/api/users'
}