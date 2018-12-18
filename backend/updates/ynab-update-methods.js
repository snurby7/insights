const ynab = require("ynab");
const userConfiguration = require("../../data/user-config");
const ynabApi = new ynab.API(userConfiguration.userConfigToken());

exports.updateBudgets = async function(db) {
  const response = await ynabApi.budgets.getBudgets();
  const budgets = response.data.budgets;
  await Promise.all(
    budgets.map(
      async budget =>
        await db.collection("budgets").updateOne(
          {
            id: budget.id
          },
          { $set: budget },
          { upsert: true }
        )
    )
  );
};
exports.updateAccounts = async function(db, budgetId) {
  const response = await ynabApi.accounts.getAccounts(budgetId);
  const accounts = response.data.accounts;
  await Promise.all(
    accounts.map(
      async account =>
        await db.collection("accounts").updateOne(
          {
            id: account.id
          },
          { $set: account },
          { upsert: true }
        )
    )
  );
};
exports.updateAllPayees = async function(db, budgetId) {
  const response = await ynabApi.payees.getPayees(budgetId);
  const payees = response.data.payees;
  await Promise.all(
    payees.map(
      async payee =>
        await db.collection("payees").updateOne(
          {
            id: payee.id
          },
          { $set: payee },
          { upsert: true }
        )
    )
  );
};
exports.updateAllTransactions = async function(db, budgetId) {
  // TODO give this the ability to update a month vs all ever.
  const response = await ynabApi.transactions.getTransactions(budgetId);
  const transactions = response.data.transactions;
  await Promise.all(
    transactions.map(
      async transaction =>
        await db.collection("transactions").updateOne(
          {
            id: transaction.id
          },
          { $set: mapOnBudgetId(transaction, budgetId) },
          { upsert: true }
        )
    )
  );
};

function mapOnBudgetId(transaction, budgetId) {
  if(transaction['budgetId']) throw Error('Transaction has a budgetId');
  transaction.budgetId = budgetId;
  return transaction;
}
