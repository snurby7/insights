exports.aggregateTransactionsByDay = function(transactions) {
  const dayOfWeekMap = {};
  transactions.forEach(transaction => {
    const dayOfWeek = new Date(transaction.date).getUTCDay();
    if (dayOfWeekMap[dayOfWeek]) {
      dayOfWeekMap[dayOfWeek].count++;
      dayOfWeekMap[dayOfWeek].income +=
        transaction.amount > 0 ? transaction.amount / 1000 : 0;
      dayOfWeekMap[dayOfWeek].expense +=
        transaction.amount < 0 ? transaction.amount / 1000 : 0;
    } else {
      dayOfWeekMap[dayOfWeek] = {};
      dayOfWeekMap[dayOfWeek].count = 1;
      dayOfWeekMap[dayOfWeek].income =
        transaction.amount > 0 ? transaction.amount / 1000 : 0;
      dayOfWeekMap[dayOfWeek].expense =
        transaction.amount < 0 ? transaction.amount / 1000 : 0;
    }
  });
  return dayOfWeekMap;
}