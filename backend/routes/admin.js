var express = require('express');
var router = express.Router();
const ynabDataUpdaters = require("../updates/ynab-update-methods");

module.exports=function(db) {

  router.post("/api/admin/update/budgets", async (req, res) => {
    await ynabDataUpdaters.updateBudgets(db);
    res.send({ success: "updated all budgets" });
  });
  router.post("/api/admin/update/payees", async (req, res) => {
    await ynabDataUpdaters.updateAllPayees(db, req.body.budgetId);
    res.send({ success: "updated all payees" });
  });
  router.post("/api/admin/update/accounts", async (req, res) => {
    await ynabDataUpdaters.updateAccounts(db, req.body.budgetId);
    res.send({ success: "updated all accounts" });
  });
  router.post("/api/admin/update/transactions", async (req, res) => {
    await ynabDataUpdaters.updateAllTransactions(db, req.body.budgetId);
    res.send({ success: "updated all transactions" });
  });
  router.post("/api/admin/update/categories", async (req, res) => {
    await ynabDataUpdaters.updateCategories(db, req.body.budgetId);
    res.send({ success: "updated all categories" });
  });

  return router;
}