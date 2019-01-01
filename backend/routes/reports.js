var express = require("express");
var moment = require("moment");
var router = express.Router();

function processResultsByMonth(results) {
  const formattedResults = {};
  Object.keys(results).forEach(key => {
    formattedResults[key] = {};
    results[key].forEach(transaction => {
      if (transaction.category_name) {
        if (!formattedResults[key][transaction.category_name]) {
          formattedResults[key][transaction.category_name] = {
            outflow: transaction.amount < 0 ? transaction.amount : 0,
            transactions: [transaction]
          };
        } else {
          const keyObj = formattedResults[key][transaction.category_name];
          if (transaction.amount < 0) keyObj.outflow += transaction.amount;
          keyObj.transactions.push(transaction);
          formattedResults[key][transaction.category_name] = keyObj;
        }
      }
    });
  });
  return formattedResults;
}

module.exports = function(db) {
  router.get("/api/reports/monthly", async (req, res) => {
    const { startingMonth, startingYear, budgetId } = req.query;
    let adjustedMonth = +startingMonth + 1;
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
        .toArray();
    }
    res.send(processResultsByMonth(results));
  });

  return router;
};
