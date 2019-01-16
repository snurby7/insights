import './index.css';
import 'typeface-roboto';

import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';

import AdminPage from './admin/admin';
import BudgetHome from './budget-home/budget-home';
import YnabAppBar from './common/ynab-app-bar';
import HomePage from './home/homepage';
import InsightAppStore from './reducers';
import * as serviceWorker from './serviceWorker';

class InsightApp extends React.Component {
  public store = createStore(InsightAppStore);

  public AdminRoute = () => <AdminPage />;
  public BudgetHomeRoute = ({ match }: any) => {
    return <BudgetHome budgetId={match.params.budgetId} />;
  };
  public HomePageRoute = () => <HomePage />;

  // TODO footer component with key metrics, short and sweet high level.

  public render() {
    return (
      <React.Fragment>
        <Provider store={this.store}>
          <CssBaseline />
          <Router>
            <div>
              <YnabAppBar />
              <Switch>
                <Route exact={true} path="/" component={this.HomePageRoute} />
                <Route exact={true} path="/admin" component={this.AdminRoute} />
                <Route exact={true} path="/budget/:budgetId" component={this.BudgetHomeRoute} />
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
