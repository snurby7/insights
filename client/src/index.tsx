import './index.css';
import 'typeface-roboto';

import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AdminPage from './admin/admin';
import BudgetHome from './budget-home/budget-home';
import YnabAppBar from './common/ynab-app-bar';
import HomePage from './home/homepage';
import * as serviceWorker from './serviceWorker';

class InsightApp extends React.Component {
  public AdminRoute = () => <AdminPage />;
  public BudgetHomeRoute = ({ match }: any) => {
    return <BudgetHome budgetId={match.params.budgetId} />;
  };
  public HomePageRoute = () => <HomePage />;

  // TODO footer component with key metrics, short and sweet high level.

  public render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}
// ========================================

ReactDOM.render(<InsightApp />, document.getElementById('root'));

serviceWorker.unregister();
