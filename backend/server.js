const ynab = require("ynab");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const userConfiguration = require("../data/user-config");
const ynabDataUtility = require("./updates/ynab-update-methods");
const ynabDataProcessing = require("./processing/ynab-data-processing");
const app = express();

// this is our MongoDB database
const dbRoute = "mongodb://localhost:27017/ynab";
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const ynabApi = new ynab.API(userConfiguration.userConfigToken());

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/budgets", async (req, res) => {
  const response = await db
    .collection("budgets")
    .find()
    .toArray();
  res.send(response);
});

app.get("/api/accounts", async (req, res) => {
  const accounts = await db
    .collection("accounts")
    .find({})
    .sort({ name: 1 })
    .toArray();
  res.send(accounts);
});

app.get("/api/categories", async (req, res) => {
  const response = await ynabApi.categories.getCategories(req.query.budgetId);
  res.send(response.data.category_groups);
});

app.get("/api/payees", async (req, res) => {
  const payees = await db
    .collection("payees")
    .find({})
    .sort({ name: 1 })
    .toArray();
  res.send(payees);
});

app.get("/api/transactions/all", async (req, res) => {
  // TODO Add the budgetId onto this so it's not just pulling everything.
  const transactions = await db
    .collection("transactions")
    .find({})
    .sort({ name: 1 })
    .toArray();
  res.send(transactions);
});

app.get("/api/transactions/payee", async (req, res) => {
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

app.get("/api/transactions/aggregate", async (req, res) => {
  const results = await db
    .collection("transactions")
    .find({
      budgetId: req.query.budgetId
    })
    .toArray();
  res.send(ynabDataProcessing.aggregateTransactionsByDay(results));
});

app.post("/api/admin/update/budgets", async (req, res) => {
  await ynabDataUtility.updateBudgets(db);
  res.send({ success: "updated all budgets" });
});
app.post("/api/admin/update/payees", async (req, res) => {
  await ynabDataUtility.updateAllPayees(db, req.body.budgetId);
  res.send({ success: "updated all payees" });
});
app.post("/api/admin/update/accounts", async (req, res) => {
  await ynabDataUtility.updateAccounts(db, req.body.budgetId);
  res.send({ success: "updated all accounts" });
});
app.post("/api/admin/update/transactions", async (req, res) => {
  await ynabDataUtility.updateAllTransactions(db, req.body.budgetId);
  res.send({ success: "updated all transactions" });
});
app.post("/api/admin/update/categories", async (req, res) => {
  await ynabDataUtility.updateAllPayees(db, req.body.budgetId);
  res.send({ success: "updated all categories" });
});

app.post("/api/users/add", async (req, res) => {
  console.log(req.body);
  // TODO need to add validation
  res.send({ success: "hi there" });
});

app.get("/api/test", async (req, res) => {
  res.send({ success: true, message: "hi there" });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
