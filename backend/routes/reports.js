var express = require("express");
var moment = require("moment");
var router = express.Router();

module.exports = function(db) {
  router.get("/api/reports/monthly", async (req, res) => {
    const { startingMonth, startingYear, budgetId } = req.query;
    var startDate = moment(`${startingYear}-${startingMonth + 1}-01`);
    var endDate = moment();
    var dates = [];
    endDate.subtract(1, "month"); //Substract one month to exclude extra end
    var month = moment(startDate); //clone the startDate
    while (month < endDate) {
      month.add(1, "month");
      dates.push(month.format("YYYY-MM-DD"));
    }

    // TODO loop over array of YYYY-MM-DD
    // substract 1 from month and search on date_month, date_year, and budgetId
    // store that in object of {[YYYY-MM-DD]: result from search}
    console.log(dates);
    res.send({});
  });

  return router;
};
