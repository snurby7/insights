import './index.css';
import 'typeface-roboto';

import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getBudgetId } from './api/BudgetApi';
import { YnabAppBar } from './components/common/app-bar/YnabAppBar';
import { AccountView, BudgetHome, BudgetSync, CategoryView, HomePage } from './components/insights';
import UserManagement from './components/insights/admin/user/user-management/UserManagement';
import * as serviceWorker from './serviceWorker';




const InsightApp = () => {
  const BudgetSyncPage = () => <BudgetSync budgetId={getBudgetId()} />;
  const BudgetHomePage = () => <BudgetHome budgetId={getBudgetId()} />;
  const Home = () => <HomePage />;
  const UserManagementPage = () => <UserManagement budgetId={getBudgetId()} />;
  const AccountViewPage = ({ match }: any) => (
    <AccountView accountId={match.params.accountId} budgetId={getBudgetId()} />
  );
  const CategoryViewPage = ({ match }: any) => (
    <CategoryView
      categoryId={match.params.categoryId}
      budgetId={getBudgetId()}
    />
  );

  // TODO footer component with key metrics, short and sweet high level.
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <div>
          <YnabAppBar budgetId={getBudgetId()} />
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route
              exact={true}
              path="/account/:accountId"
              component={AccountViewPage}
            />
            <Route
              exact={true}
              path="/admin/user"
              component={UserManagementPage}
            />
            <Route exact={true} path="/budget/" component={BudgetHomePage} />
            <Route
              exact={true}
              path="/budget/update"
              component={BudgetSyncPage}
            />
            <Route
              exact={true}
              path="/category/:categoryId"
              component={CategoryViewPage}
            />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};

ReactDOM.render(<InsightApp />, document.getElementById('root'));

serviceWorker.unregister();
