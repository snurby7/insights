import './index.css';
import 'typeface-roboto';

import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';

import { VisibleYnabAppBar } from './components/common';
import {
  HomePage,
  VisibleAccountView,
  VisibleAdminPage,
  VisibleBudgetHomePage,
  VisibleCategoryViewPage,
  VisibleUsersComponent,
} from './components/insights';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';

class InsightApp extends React.Component {
  public store = createStore(rootReducer);

  public AdminRoute = () => <VisibleAdminPage />;
  public BudgetHomeRoute = () => <VisibleBudgetHomePage />;
  public HomePageRoute = () => <HomePage />;
  public UserRoute = () => <VisibleUsersComponent />;
  public AccountView = ({ match }: any) => <VisibleAccountView accountId={match.params.accountId} />;
  public CategoryView = ({ match }: any) => <VisibleCategoryViewPage categoryId={match.params.categoryId} />;

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
                <Route exact={true} path="/account/:accountId" component={this.AccountView} />
                <Route exact={true} path="/admin/user" component={this.AdminRoute} />
                <Route exact={true} path="/budget/" component={this.BudgetHomeRoute} />
                <Route exact={true} path="/budget/update" component={this.AdminRoute} />
                <Route exact={true} path="/category/:categoryId" component={this.CategoryView} />
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
