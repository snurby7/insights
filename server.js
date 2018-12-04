const ynabRequire = require('ynab');

const express = require('express');
const path = require('path');
const userConfiguration = require('./client/data/user-config')
const bodyParser = require('body-parser');

const app = express();
const ynab = new ynabRequire.API(userConfiguration.userConfigToken());

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// API calls
app.get('/api/budgets', async(req, res) => {
    const response = await ynab.budgets.getBudgets();
    res.send(response.data.budgets);
});

app.get('/api/accounts', async(req, res) => {
    const response = await ynab.accounts.getAccounts(req.query.budgetId);
    res.send(response.data.accounts);
});
app.get('/api/categories', async(req, res) => {
    const response = await ynab.categories.getCategories(req.query.budgetId);
    res.send(response.data.category_groups);
});
app.get('/api/payees', async(req, res) => {
    const response = await ynab.payees.getPayees(req.query.budgetId);
    res.send(response.data.payees);
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));