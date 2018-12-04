const YnabService = {
    getYnabApi: () => {
        // return new ynab.API(UserConfiguration.userToken);
    },
    getBudgets: () => {
        // const api = YnabService.getYnabApi();
        // return api.budgets.getBudgets();
    },
    getAccounts: (budgetId) => {
        // const api = YnabService.getYnabApi();
        // return api.accounts.getAccounts(budgetId)
    },
    getCategories: (budgetId) => {
        // const api = YnabService.getYnabApi();
        // return api.categories.getCategories(budgetId);
    },
    getPayees: (budgetId) => {
        // const api = YnabService.getYnabApi();
        // return api.payees.getPayees(budgetId);
    }
};

export default YnabService;