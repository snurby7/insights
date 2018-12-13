import './index.css';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BudgetHome from './budget-home/budget-home';
import Payees from './payees/payees';
import HomePage from './home/homepage';
import AdminPage from './admin/admin';
import YnabAppBar from './common/ynab-app-bar';
import Transactions from './transactions/transactions';

const HomePageRoute = () => <HomePage/>
const AdminRoute = () => <AdminPage/>
const BudgetHomeRoute = ({match}) => <BudgetHome budgetId={match.params.budgetId}/>;
const PayeesRoute = ({match}) => <Payees budgetId={match.params.budgetId}/>;
const TransactionsRoute = ({match}) => <Transactions budgetId={match.params.budgetId}/>;

class InsightApp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <YnabAppBar />
        <Router>
          <Switch>
            <Route exact path="/" component={HomePageRoute}/>
            <Route exact path="/admin" component={AdminRoute}/>
            <Route exact path="/budget/:budgetId" component={BudgetHomeRoute}/>
            <Route exact path="/budget/:budgetId/payees" component={PayeesRoute}/>
            <Route exact path="/budget/:budgetId/transactions" component={TransactionsRoute}/>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
// ========================================

ReactDOM.render(
  <InsightApp/>, document.getElementById('root'));
