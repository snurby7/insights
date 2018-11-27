import * as ynab from 'ynab';
import UserConfiguration from '../data/user-config';
const YnabService = {
    getYnabApi: () => {
        return new ynab.API(UserConfiguration.userToken);
    },
    getBudgets: () => {
        const api = YnabService.getYnabApi();
        return api.budgets.getBudgets();
    },
    getAccounts: (budgetId) => {
        const api = YnabService.getYnabApi();
        return api.accounts.getAccounts(budgetId)
    }
};

export default YnabService;