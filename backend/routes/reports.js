var express = require("express");
var router = express.Router();
const ynabDataUpdaters = require("../updates/ynab-update-methods");

module.exports = function(db) {
  router.post("/api/reports/monthly", async (req, res) => {
    const budgetId = req.query.budgetId;

    res.send({ success: "updated all categories" });
  });

  return router;
};
