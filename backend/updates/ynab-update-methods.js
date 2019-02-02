const ynab = require("ynab");
const userConfiguration = require("../../data/user-config");
const ynabApi = new ynab.API(userConfiguration.userConfigToken);

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

exports.updateCategories = async function(db, budgetId) {
  const response = await ynabApi.categories.getCategories(budgetId);
  const categoryGroups = response.data.category_groups;
  await Promise.all(
    categoryGroups.map(
      async category =>
        await db.collection("categories").updateOne(
          {
            id: category.id
          },
          { $set: mapOnBudgetId(category, budgetId) },
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
      async (account) =>
        await db.collection("accounts").updateOne(
          {
            id: account.id
          },
          { $set: mapOnBudgetId(account, budgetId) },
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
          { $set: mapTransactions(transaction, budgetId) },
          { upsert: true }
        )
    )
  );
};

function mapOnBudgetId(item, budgetId) {
  if (item["budgetId"]) throw Error("item has a budgetId");
  item.budgetId = budgetId;
  return item;
}

function mapTransactions(item, budgetId) {
  const transaction = mapOnBudgetId(item, budgetId);
  const dateParts = transaction.date.split("-");
  transaction.date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  transaction.date_month = +dateParts[1] - 1;
  transaction.date_year = +dateParts[0];
  return transaction;
}
