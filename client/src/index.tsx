import './index.css';
import 'typeface-roboto';

import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';

import AccountView from './accounts/view/account-view';
import { VisibleUsersComponent } from './admin/management/visible-user-management';
import { VisibleAdminComponent } from './admin/visible-admin';
import { VisibleBudgetHomePage } from './budget-home/visible-homepage';
import { VisibleYnabAppBar } from './common/visible-ynab-app-bar';
import HomePage from './home/homepage';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';

class InsightApp extends React.Component {
  public store = createStore(rootReducer);

  public AdminRoute = () => <VisibleAdminComponent />;
  public BudgetHomeRoute = () => <VisibleBudgetHomePage />;
  public HomePageRoute = () => <HomePage />;
  public UserRoute = () => <VisibleUsersComponent />;
  public AccountView = ({ match }: any) => <AccountView accountId={match.params.accountId} />;

  // TODO footer component with key metrics, short and sweet high level.
  public render() {
    return (
      <React.Fragment>
        <Provider store={this.store}>
          <CssBaseline />
          <Router>
            <div>
              <VisibleYnabAppBar />
              <Switch>
                <Route exact={true} path="/" component={this.HomePageRoute} />
                <Route exact={true} path="/admin/user" component={this.AdminRoute} />
                <Route exact={true} path="/budget/update" component={this.AdminRoute} />
                <Route exact={true} path="/budget/" component={this.BudgetHomeRoute} />
                <Route exact={true} path="/account/:accountId" component={this.AccountView} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
}
// ========================================

ReactDOM.render(<InsightApp />, document.getElementById('root'));

serviceWorker.unregister();
