import { TransactionDetail } from 'ynab';

interface IDaySpending {
  count: number;
  income: number;
  expense: number;
  amount: number;
}

export const aggregateTransactionsByDay = function(transactions: TransactionDetail[]) {
  const dayOfWeekMap: {[weekDay: number]: IDaySpending} = {};
  transactions.forEach(transaction => {
    const dayOfWeek = new Date(transaction.date).getUTCDay();
    if (dayOfWeekMap[dayOfWeek]) {
      dayOfWeekMap[dayOfWeek].count++;
      dayOfWeekMap[dayOfWeek].income +=
        transaction.amount > 0 ? transaction.amount / 1000 : 0;
      dayOfWeekMap[dayOfWeek].expense +=
        transaction.amount < 0 ? transaction.amount / 1000 : 0;
    } else {
      dayOfWeekMap[dayOfWeek] = <IDaySpending>{};
      dayOfWeekMap[dayOfWeek].count = 1;
      dayOfWeekMap[dayOfWeek].income =
        transaction.amount > 0 ? transaction.amount / 1000 : 0;
      dayOfWeekMap[dayOfWeek].expense =
        transaction.amount < 0 ? transaction.amount / 1000 : 0;
    }
  });
  return dayOfWeekMap;
};