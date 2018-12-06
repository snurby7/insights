const ynab = require('ynab');
const mongoose = require("mongoose");
const express = require('express');
const path = require('path');
const userConfiguration = require('../data/user-config')
const bodyParser = require('body-parser');

const Data = require('./data');

const app = express();

// this is our MongoDB database
const dbRoute = "mongodb://localhost:27017/ynab";
mongoose.connect(dbRoute, {useNewUrlParser: true});

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const ynabApi = new ynab.API(userConfiguration.userConfigToken());

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// API calls
app.get('/api/budgets', (req, res) => {
    db.collection('budgets').find().toArray().then(result =>
        res.send(result)
    , error => console.log(error));
});

app.get('/api/accounts', async(req, res) => {
    const response = await ynabApi
        .accounts
        .getAccounts(req.query.budgetId);
    res.send(response.data.accounts);
});
app.get('/api/categories', async(req, res) => {
    const response = await ynabApi
        .categories
        .getCategories(req.query.budgetId);
    res.send(response.data.category_groups);
});
app.get('/api/payees', async(req, res) => {
    const response = await ynabApi
        .payees
        .getPayees(req.query.budgetId);
    res.send(response.data.payees);
});
app.get('/api/test', async(req, res) => {
    // updateBudgets();
});

// TODO make this actually update the budgets instead of hack delete them all and then insert
async function updateBudgets() {
    // db.collection('budgets').deleteMany({})
    const response = await ynabApi
        .budgets
        .getBudgets();
    const budgets =  response.data.budgets;
    await db.collection('budgets').insertMany(budgets);
}

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));