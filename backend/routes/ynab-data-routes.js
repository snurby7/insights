var express = require("express");
var router = express.Router();

module.exports = function(db) {
  router.get("/api/budgets", async (req, res) => {
    const response = await db
      .collection("budgets")
      .find()
      .toArray();
    res.send(response);
  });

  router.get("/api/accounts", async (req, res) => {
    const accounts = await db
      .collection("accounts")
      .find({})
      .sort({ name: 1 })
      .toArray();
    res.send(accounts);
  });

  router.get("/api/categories", async (req, res) => {
    const categories = await db.collection('categories').find({
      budgetId: req.query.budgetId,
      hidden: false
    }).sort({name: 1}).toArray();
    res.send(categories);
  });

  router.get("/api/payees", async (req, res) => {
    const payees = await db
      .collection("payees")
      .find({})
      .sort({ name: 1 })
      .toArray();
    res.send(payees);
  });

  router.get("/api/transactions/all", async (req, res) => {
    // TODO Add the budgetId onto this so it's not just pulling everything.
    const transactions = await db
      .collection("transactions")
      .find({})
      .sort({ name: 1 })
      .toArray();
    res.send(transactions);
  });

  router.get("/api/transactions/payee", async (req, res) => {
    // TODO Add the budgetId onto this so it's not just pulling everything.
    const query = req.query;
    const transactions = await db
      .collection("transactions")
      .find({
        payee_id: query.payeeId
      })
      .sort({ name: 1 })
      .toArray();
    res.send(transactions);
  });

  router.get("/api/transactions/aggregate", async (req, res) => {
    const results = await db
      .collection("transactions")
      .find({
        budgetId: req.query.budgetId
      })
      .toArray();
    res.send(ynabDataProcessing.aggregateTransactionsByDay(results));
  });

  return router;
};
