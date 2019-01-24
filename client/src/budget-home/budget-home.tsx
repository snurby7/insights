import { StyleRules, StyleRulesCallback, Theme, withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import React from 'react';
import { connect } from 'react-redux';

import { SiteActions } from '../actions/site-actions';
import { IYnabAppDrawerListItem } from '../common/ynab-app-drawer';
import { IReducerAction } from '../contracts/reducer-action.interface';
import Accounts from './accounts/accounts';
import { BudgetActions } from './budget-actions';
import Categories from './categories/categories';
import LifeEnergy from './life-energy/life-energy';
import Payees from './payees/payees';
import ReportsHome from './reports/reports-home';
import Transactions from './transactions/transactions';

export interface IBudgetHomeProps {
  budgetId: string;
  dispatch: (action: IReducerAction) => void;
  classes: Record<string, string>;
}

export interface IBudgetHomeState {
  selectedSection: BudgetActions;
}

const styles: StyleRulesCallback<string> | StyleRules<string> = (theme: Theme) => ({
  elementContainer: {
    display: 'flex',
    overflowX: 'hidden',
  },
  accountsContainer: {
    width: '300px',
    position: 'fixed' as 'fixed',
    height: '100vh',
    boxShadow: `2px 2px 5px ${fade(theme.palette.common.black, 0.4)}`,
    paddingRight: 10,
    paddingLeft: 10,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.9),
    color: theme.palette.common.white,
  },
  categoriesContainer: {
    marginLeft: '315px',
    width: '100%',
    overflowY: 'auto',
  },
});

class BudgetHome extends React.Component<IBudgetHomeProps, IBudgetHomeState> {
  public state = {
    selectedSection: BudgetActions.Home,
  };

  public getNavItemsForBudgetHome(): IYnabAppDrawerListItem[] {
    return [
      {
        id: `694a09f5-57f4-4aa6-abe7-93b9a3f7d801`,
        displayName: 'Home',
        onClick: () => this.setState({ selectedSection: BudgetActions.Home }),
      },
      {
        id: `1a562f70-9738-493d-bcb3-42b732a87c53`,
        displayName: 'View Life Energy',
        onClick: () => this.setState({ selectedSection: BudgetActions.LifeEnergy }),
      },
      {
        id: `3a9a0381-1cc7-4a5a-96f3-cf9f734d45c7`,
        displayName: 'View Payees',
        onClick: () => this.setState({ selectedSection: BudgetActions.Payees }),
      },
      {
        id: `f0b3df29-a6c8-490d-b0bf-1394aebb364e`,
        displayName: 'View Transactions',
        onClick: () => this.setState({ selectedSection: BudgetActions.Transactions }),
      },
      {
        id: `a0bf194a-de88-4c21-bdb6-5708af9e7117`,
        displayName: 'View Reports',
        onClick: () => this.setState({ selectedSection: BudgetActions.Reports }),
      },
    ];
  }

  public componentDidMount = () => {
    this.props.dispatch({
      type: SiteActions.UPDATE_NAV_ITEMS,
      payload: this.getNavItemsForBudgetHome(),
    });
  };

  public componentWillUnmount = () => {
    this.props.dispatch({
      type: SiteActions.UPDATE_NAV_ITEMS,
      payload: [],
    });
  };

  public render() {
    const { selectedSection } = this.state;
    const { budgetId, classes } = this.props;
    return (
      <div>
        <h3>Welcome to your budget Home</h3>
        <div className={classes.elementContainer}>
          {selectedSection === BudgetActions.Home && (
            <React.Fragment>
              <div className={classes.accountsContainer}>
                <Accounts budgetId={budgetId} />
              </div>
              <div className={classes.categoriesContainer}>
                <Categories budgetId={budgetId} />
              </div>
            </React.Fragment>
          )}
          {selectedSection === BudgetActions.LifeEnergy && <LifeEnergy budgetId={budgetId} />}
          {selectedSection === BudgetActions.Payees && <Payees budgetId={budgetId} />}
          {selectedSection === BudgetActions.Transactions && <Transactions budgetId={budgetId} />}
          {selectedSection === BudgetActions.Reports && <ReportsHome budgetId={budgetId} />}
        </div>
      </div>
    );
  }
}

export default connect()(withStyles(styles, { withTheme: true })(BudgetHome));
