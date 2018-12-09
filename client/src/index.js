import './index.css';
import 'typeface-roboto';

import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './home/home';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BudgetHome from './budget-home/budget-home';
import Payees from './payees/payees';
import HomePage2 from './home/home2.0';

const Index = () => <HomePage/>;
const NewIndex = () => <HomePage2/>
const BudgetHomeComponent = ({match}) => <BudgetHome budgetId={match.params.budgetId}/>;
const PayeesComponent = ({match}) => <Payees budgetId={match.params.budgetId}/>;

class InsightApp extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={NewIndex}/>
          {/* <Route exact path="/" component={Index}/> */}
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
