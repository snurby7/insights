var express = require("express");
var moment = require("moment");
var router = express.Router();

function processTransaction(results, key, transaction) {
  if (!results[key][transaction.category_id]) {
    results[key][transaction.category_id] = {
      categoryName: transaction.category_name
        ? transaction.category_name
        : "Auto Budgetted",
      outflow: transaction.amount < 0 ? transaction.amount : 0,
      inflow: transaction.amount > 0 ? transaction.amount : 0,
      transactions: [transaction]
    };
    return;
  }
  const keyObj = results[key][transaction.category_id];
  if (transaction.amount < 0) keyObj.outflow += transaction.amount;
  if (transaction.amount > 0) keyObj.inflow += transaction.amount;
  keyObj.transactions.push(transaction);
  results[key][transaction.category_id] = keyObj;
}

function processResultsByMonth(results) {
  const formattedResults = {};
  Object.keys(results).forEach(key => {
    formattedResults[key] = {};
    results[key].forEach(transaction => {
      if (transaction.category_id) {
        if (
          transaction.subtransactions &&
          transaction.subtransactions.length > 0
        ) {
          transaction.subtransactions.forEach(sub =>
            processTransaction(formattedResults, key, sub)
          );
        } else {
          processTransaction(formattedResults, key, transaction);
        }
        if (
          transaction.category_name &&
          formattedResults[key] &&
          formattedResults[key][transaction.category_id]
        ) {
          formattedResults[key][transaction.category_id].categoryName =
            transaction.category_name;
        }
      }
    });
  });
  return formattedResults;
}

module.exports = function(db) {
  router.get("/api/reports/monthly", async (req, res) => {
    const { startingMonth, startingYear, budgetId } = req.query;
    let adjustedMonth = +startingMonth;
    if (adjustedMonth < 10) adjustedMonth = "0" + adjustedMonth;
    const startDate = moment(`${startingYear}-${adjustedMonth}-01`);
    const endDate = moment();
    var results = {};

    endDate.subtract(1, "month"); //Substract one month to exclude extra end
    let month = moment(startDate); //clone the startDate
    while (month < endDate) {
      month.add(1, "month");
      results[month.format("YYYY-MM-DD")] = await db
        .collection("transactions")
        .find({
          date_month: month.month(),
          date_year: month.year(),
          budgetId
        })
        .sort({ category_name: 1 })
        .toArray();
    }
    res.send(processResultsByMonth(results));
  });

  return router;
};
