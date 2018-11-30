import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './home/home';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BudgetHome from './budget-home/budget-home';
import Payees from './budget-home/payees/payees';

const Index = () => <HomePage/>;
const BudgetHomeComponent = ({match}) => <BudgetHome budgetId={match.params.budgetId}/>;
const PayeesComponent = ({match}) => <Payees budgetId={match.params.budgetId}/>;

class InsightApp extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route exact path="/budget/:budgetId" component={BudgetHomeComponent}/>
          <Route exact path="/budget/:budgetId/payees" component={PayeesComponent}/>
        </Switch>
      </Router>
    );
  }
}
// ========================================

ReactDOM.render(
  <InsightApp/>, document.getElementById('root'));
