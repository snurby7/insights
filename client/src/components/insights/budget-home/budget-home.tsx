import { StyleRules, StyleRulesCallback, Theme, withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import React from 'react';
import { connect } from 'react-redux';

import { IReducerAction } from '../../../contracts';
import Accounts from '../accounts/accounts';
import ActionBarComponent, { IActionBarAction } from '../action-bar/action-bar';
import CategoryGroupWithCategories from '../categories/category-group-with-categories';
import LifeEnergy from '../life-energy/life-energy';
import Payees from '../payees/payees';
import ReportsHome from '../reports/reports-home';
import Transactions from '../transactions/transactions';
import { BudgetActions } from './budget-actions';

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

  private actionItems: IActionBarAction[] = [
    {
      id: `694a09f5-57f4-4aa6-abe7-93b9a3f7d801`,
      displayName: 'Home',
      onClick: () => this.updateStateIfDifferent(BudgetActions.Home),
    },
    {
      id: `1a562f70-9738-493d-bcb3-42b732a87c53`,
      displayName: 'View Life Energy',
      onClick: () => this.updateStateIfDifferent(BudgetActions.LifeEnergy),
    },
    {
      id: `3a9a0381-1cc7-4a5a-96f3-cf9f734d45c7`,
      displayName: 'View Payees',
      onClick: () => this.updateStateIfDifferent(BudgetActions.Payees),
    },
    {
      id: `f0b3df29-a6c8-490d-b0bf-1394aebb364e`,
      displayName: 'View Transactions',
      onClick: () => this.updateStateIfDifferent(BudgetActions.Transactions),
    },
    {
      id: `a0bf194a-de88-4c21-bdb6-5708af9e7117`,
      displayName: 'View Reports',
      onClick: () => this.updateStateIfDifferent(BudgetActions.Reports),
    },
  ];

  public render() {
    const { selectedSection } = this.state;
    const { budgetId, classes } = this.props;
    return (
      <div>
        <h3>Welcome to your budget Home</h3>
        <div className={classes.elementContainer}>
          <ActionBarComponent actionItems={this.actionItems}>
            <Accounts budgetId={budgetId} />
          </ActionBarComponent>
          {this.getVisibleSection(selectedSection)}
        </div>
      </div>
    );
  }

  private updateStateIfDifferent(selectedSection: BudgetActions): void {
    if (selectedSection === this.state.selectedSection) {
      return;
    }
    this.setState({ selectedSection });
  }

  private getVisibleSection(selectedSection: BudgetActions) {
    const { budgetId } = this.props;
    switch (selectedSection) {
      case BudgetActions.Home:
        return <CategoryGroupWithCategories budgetId={budgetId} />;
      case BudgetActions.LifeEnergy:
        return <LifeEnergy budgetId={budgetId} />;
      case BudgetActions.Payees:
        return <Payees budgetId={budgetId} />;
      case BudgetActions.Transactions:
        return <Transactions budgetId={budgetId} />;
      case BudgetActions.Reports:
        return <ReportsHome budgetId={budgetId} />;
      default:
        return null;
    }
  }
}

export default connect()(withStyles(styles, { withTheme: true })(BudgetHome));
