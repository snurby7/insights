const InsightRoutes = {
  getBudgets:  "/api/budgets",
  getAccounts:  "/api/accounts",
  getCategories:  "/api/categories",
  getPayees:  "/api/payees",
  getAllTransactions:  "/api/transactions/all",
  getTransactionsByPayee:  "/api/transactions/payee",
  getTransactionsByDay:  "/api/transactions/aggregate",
  postUpdateBudgets:  "/api/admin/update/budgets",
  postUpdatePayees:  "/api/admin/update/payees",
  postUpdateAccounts:  "/api/admin/update/accounts",
  postUpdateTransactions:  "/api/admin/update/transactions",
  postUpdateCategories:  "/api/admin/update/categories",
  postAddUser: '/api/users/add'
}
export default InsightRoutes;