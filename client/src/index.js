import './index.css';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AdminPage from './admin/admin';
import BudgetHome from './budget-home/budget-home';
import HomePage from './home/homepage';
import LifeEnergy from './life-energy/life-energy';
import Payees from './payees/payees';
import Transactions from './transactions/transactions';
import YnabAppBar from './common/ynab-app-bar';

const AdminRoute = () => <AdminPage/>
const BudgetHomeRoute = ({match}) => <BudgetHome budgetId={match.params.budgetId}/>;
const HomePageRoute = () => <HomePage/>
const LifeEnergyRoute = ({match}) => <LifeEnergy budgetId={match.params.budgetId}/>
const PayeesRoute = ({match}) => <Payees budgetId={match.params.budgetId}/>;
const TransactionsRoute = ({match}) => <Transactions budgetId={match.params.budgetId}/>;

class InsightApp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div>
            <YnabAppBar />
            <Switch>
              <Route exact path="/" component={HomePageRoute}/>
              <Route exact path="/admin" component={AdminRoute}/>
              <Route exact path="/budget/:budgetId" component={BudgetHomeRoute}/>
              <Route exact path="/budget/:budgetId/life-energy" component={LifeEnergyRoute}/>
              <Route exact path="/budget/:budgetId/payees" component={PayeesRoute}/>
              <Route exact path="/budget/:budgetId/transactions" component={TransactionsRoute}/>
            </Switch>
            {/* TODO footer component with key metrics, short and sweet high level. */}
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
// ========================================

ReactDOM.render(
  <InsightApp/>, document.getElementById('root'));
