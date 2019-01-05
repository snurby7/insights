import './index.css';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AdminPage from './admin/admin';
import BudgetHome from './budget-home/budget-home';
import HomePage from './home/homepage';
import UserManagement from './admin/management/user-management';
import YnabAppBar from './common/ynab-app-bar';

const AdminRoute = () => <AdminPage/>
const BudgetHomeRoute = ({match}) => <BudgetHome budgetId={match.params.budgetId}/>;
const HomePageRoute = () => <HomePage/>
const UserManagementRoute = ({match}) => <UserManagement budgetId={match.params.budgetId}/>;

// TODO footer component with key metrics, short and sweet high level.

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
              <Route exact path="/admin/:budgetId/users" component={UserManagementRoute}/>
              <Route exact path="/budget/:budgetId" component={BudgetHomeRoute}/>
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
// ========================================

ReactDOM.render(
  <InsightApp/>, document.getElementById('root'));
