import { StyleRules, StyleRulesCallback, Theme, withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import React from 'react';
import { connect } from 'react-redux';

import AccountsContainer from '../../accounts/components/AccountsContainer';
import ActionBarComponent from '../../action-bar/components/ActionBar';
import { IActionBarAction } from '../../action-bar/components/IActionBarAction';
import CategoryGroupWithCategories from '../../categories/CategoryGroupWithCategories';
import LifeEnergy from '../../life-energy/LifeEnergy';
import Payees from '../../payees/Payees';
import ReportsHome from '../../reports/page/ReportsHomePage';
import Transactions from '../../transactions/page/Transactions';
import { IBudgetHomePageProps } from '../contracts/IBudgetHomePageProps';
import { BudgetActions } from '../enums/budget-actions.enum';

export interface IBudgetHomeState {
  selectedSection: BudgetActions;
}

const styles: StyleRulesCallback<string> | StyleRules<string> = (theme: Theme) => ({
  elementContainer: {
    display: 'flex',
    overflowX: 'hidden',
  },
  mainContainer: {
    marginLeft: '315px',
    overflowY: 'auto',
    width: '100%',
  },
  sideBarContainer: {
    width: '300px',
    position: 'fixed' as 'fixed',
    height: '100vh',
    boxShadow: `2px 2px 5px ${fade(theme.palette.common.black, 0.4)}`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.9),
    color: theme.palette.primary.contrastText,
  },
});

class BudgetHomePage extends React.Component<IBudgetHomePageProps, IBudgetHomeState> {
  public state = {
    selectedSection: BudgetActions.Home,
  };

  private actionItems: IActionBarAction[] = [
    {
      id: `694a09f5-57f4-4aa6-abe7-93b9a3f7d801`,
      displayName: 'Home',
      iconName: 'home',
      onClick: () => this.updateStateIfDifferent(BudgetActions.Home),
    },
    {
      id: `1a562f70-9738-493d-bcb3-42b732a87c53`,
      displayName: 'View Life Energy',
      iconName: 'transfer_within_a_station',
      onClick: () => this.updateStateIfDifferent(BudgetActions.LifeEnergy),
    },
    {
      id: `3a9a0381-1cc7-4a5a-96f3-cf9f734d45c7`,
      displayName: 'View Payees',
      iconName: 'people',
      onClick: () => this.updateStateIfDifferent(BudgetActions.Payees),
    },
    {
      id: `f0b3df29-a6c8-490d-b0bf-1394aebb364e`,
      displayName: 'View Transactions',
      iconName: 'attach_money',
      onClick: () => this.updateStateIfDifferent(BudgetActions.Transactions),
    },
    {
      id: `a0bf194a-de88-4c21-bdb6-5708af9e7117`,
      displayName: 'View Reports',
      iconName: 'compare_arrows',
      onClick: () => this.updateStateIfDifferent(BudgetActions.Reports),
    },
  ];

  public render() {
    const { selectedSection } = this.state;
    const { budgetId, classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.elementContainer}>
          <div className={classes.sideBarContainer}>
            <ActionBarComponent actionItems={this.actionItems}>
              <AccountsContainer budgetId={budgetId} />
            </ActionBarComponent>
          </div>
          <main className={classes.mainContainer}>{this.getVisibleSection(selectedSection)}</main>
        </div>
      </React.Fragment>
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

export default connect()(withStyles(styles, { withTheme: true })(BudgetHomePage));
