import { Connection } from 'mongoose';
import { Account, API, api, CategoryGroupWithCategories, Payee, TransactionDetail } from 'ynab';

import { UserConfig } from '../data/user-config.enum';
import { FormatUtility } from '../format/format.utility';

const ynabApi: api = new API(UserConfig.YnabToken);

type ITransactionDetailOmit<TransactionDetail, K extends keyof TransactionDetail> = Pick<TransactionDetail, Exclude<keyof TransactionDetail, K>>;

interface IBudgetId {
  budgetId?: string;
}
interface IMongoMonthYear {
  date_month: number;
  date_year: number;
}
interface IInsightCategoryGroup extends CategoryGroupWithCategories, IBudgetId {}
interface IInsightAccount extends Account, IBudgetId {}
interface IInsightPayee extends Payee, IBudgetId {}
interface ITransactionDetail extends TransactionDetail, IMongoMonthYear {}
interface IInsightTransactionDetail extends ITransactionDetailOmit<ITransactionDetail, 'date'>, IBudgetId {
  date: Date | string;
}

export const updateBudgets = async function(db: Connection) {
  const response = await ynabApi.budgets.getBudgets();
  const budgets = response.data.budgets;
  await Promise.all(
    budgets.map(
      async budget =>
        await db.collection('budgets').updateOne(
          {
            id: budget.id
          },
          { $set: budget },
          { upsert: true }
        )
    )
  );
};

export const updateCategories = async function(db: Connection, budgetId: string) {
  const response = await ynabApi.categories.getCategories(budgetId);
  const categoryGroups = response.data.category_groups;
  await Promise.all(
    categoryGroups.map(
      async category => {
          const record = mapOnBudgetId<IInsightCategoryGroup>(category, budgetId);
          record.categories.forEach(category => {
            FormatUtility.currencyFormat(category, 'activity');
            FormatUtility.currencyFormat(category, 'balance');
            FormatUtility.currencyFormat(category, 'budgeted');
          });
          return await db.collection('categories').updateOne(
          {
            id: category.id
          },
          { $set: record },
          { upsert: true }
        );
      }
    )
  );
};

export const updateAccounts = async function(db: Connection, budgetId: string) {
  const response = await ynabApi.accounts.getAccounts(budgetId);
  const accounts = response.data.accounts;
  await Promise.all(
    accounts.map(
      async (account) => {
          const record = FormatUtility.currencyFormat(mapOnBudgetId<IInsightAccount>(account, budgetId), 'balance');
          return await db.collection('accounts').updateOne(
          {
            id: account.id
          },
          { $set: record },
          { upsert: true }
        );
      }
    )
  );
};
export const updateAllPayees = async function(db: Connection, budgetId: string) {
  const response = await ynabApi.payees.getPayees(budgetId);
  const payees = response.data.payees;
  await Promise.all(
    payees.map(
      async payee => {
        return await db.collection('payees').updateOne(
          {
            id: payee.id
          },
          { $set: mapOnBudgetId<IInsightPayee>(payee, budgetId) },
          { upsert: true }
        ); }
    )
  );
};
export const updateAllTransactions = async function(db: Connection, budgetId: string) {
  // TODO give this the ability to update a month vs all ever.
  const response = await ynabApi.transactions.getTransactions(budgetId);
  const transactions = response.data.transactions;
  await Promise.all(
    transactions.map(
      async transaction => {
        const record = formatAmount(
          mapTransactions<IInsightTransactionDetail>(<IInsightTransactionDetail>transaction, budgetId),
          'amount'
        );
        record.subtransactions.forEach(sub => {
          sub = FormatUtility.currencyFormat(sub, 'amount');
        });
        return await db.collection('transactions').updateOne(
          {
            id: transaction.id
          },
          { $set: record },
          { upsert: true }
        );
      }
    )
  );
};

function formatAmount<T>(item: T, key: keyof T): T {
  return FormatUtility.currencyFormat<T>(item, key);
}


function mapOnBudgetId<T extends IBudgetId>(item: T, budgetId: string): T {
  if (item.budgetId) { throw Error('item has a budgetId'); }
  item.budgetId = budgetId;
  return item;
}

function mapTransactions<T extends IInsightTransactionDetail>(item: T, budgetId: string): IInsightTransactionDetail {
  const transaction = mapOnBudgetId<IInsightTransactionDetail>(item, budgetId);
  const dateParts = (transaction.date as string).split('-');
  transaction.date = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
  transaction.date_month = +dateParts[1] - 1;
  transaction.date_year = +dateParts[0];
  return transaction;
}
