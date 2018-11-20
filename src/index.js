import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './home/home';

import {BrowserRouter as Router, Route} from "react-router-dom";
import BudgetHome from './budget-home/budget-home';

const Index = () => <HomePage/>;
const BudgetHomeComponent = ({match}) => <BudgetHome budgetId={match.params.budgetId}/>;

class InsightApp extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Index}/>
          <Route path="/budget/:budgetId" component={BudgetHomeComponent}/>
        </div>
      </Router>
    );
  }
}
// ========================================

ReactDOM.render(
  <InsightApp/>, document.getElementById('root'));
