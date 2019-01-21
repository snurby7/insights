import React from 'react';
import { connect } from 'react-redux';

import { SiteActions } from '../actions/site-actions';
import AdminAgent from '../agents/admin-agent';
import GridDisplay from '../common/grid-display';
import { IYnabAppDrawerListItem } from '../common/ynab-app-drawer';
import { AdminActions } from './admin-actions';
import UserManagement from './management/user-management';

// TODO make this look less bad.

interface IAdminState {
  budgets: any[];
  selectedBudget: any;
  selectedAction: AdminActions | null;
}

interface IAdminProps {
  dispatch: (action: any) => void;
}

class AdminPage extends React.Component<IAdminProps, IAdminState> {
  public state: IAdminState = {
    budgets: [],
    selectedBudget: null,
    selectedAction: null,
  };

  public getNavItemsForAdminPage(): IYnabAppDrawerListItem[] {
    const { selectedBudget } = this.state;
    const isDisabled = !selectedBudget;
    return [
      {
        id: `3ffb4f7c-388e-42f4-844f-67590f12e87b`,
        displayName: 'Data Updaters',
        isDisabled,
        onClick: () => this.setState({ selectedAction: AdminActions.DataUpdater }),
      },
      {
        id: `ce11a171-272f-4d4f-a939-27c89f1a1b20`,
        displayName: 'User Management',
        isDisabled,
        onClick: () => this.setState({ selectedAction: AdminActions.UserManagement }),
      },
    ];
  }

  public componentDidMount = () => {
    AdminAgent.getBudgets().then(budgets => {
      this.convertBudgetsToDisplayData(budgets);
      this.dispatchToStore();
    });
  };

  public dispatchToStore = () => {
    this.props.dispatch({
      type: SiteActions.UPDATE_NAV_ITEMS,
      payload: this.getNavItemsForAdminPage(),
    });
  };

  public componentWillUnmount = () => {
    this.props.dispatch({
      type: SiteActions.UPDATE_NAV_ITEMS,
      payload: [],
    });
  };

  public getButtonsToRender() {
    const { selectedBudget } = this.state;
    return [
      {
        id: '6f4c9a94-01c7-48e1-b1d1-2553f5d731d4',
        cardTitle: 'Payees',
        subTitles: ['Refresh all payees from YNAB and store results'],
        onClick: () => AdminAgent.updatePayees(selectedBudget.id),
        buttonText: 'Update',
      },
      {
        id: 'a9a59754-bd48-481c-8b38-2e309dc758c4',
        cardTitle: 'Accounts',
        subTitles: ['Refresh all accounts from YNAB and store results'],
        onClick: () => AdminAgent.updateAccounts(selectedBudget.id),
        buttonText: 'Update',
      },
      {
        id: 'c359aa34-36e8-495b-b8dd-03369dca603b',
        cardTitle: 'Transactions',
        subTitles: ['Refresh all transactions from YNAB and store results'],
        onClick: () => AdminAgent.udateTransactions(selectedBudget.id),
        buttonText: 'Update',
      },
      {
        id: '65085516-7d61-4a6c-af2b-332cda839434',
        cardTitle: 'Categories',
        subTitles: ['Refresh all categories from YNAB and store results'],
        onClick: () => AdminAgent.updateCategories(selectedBudget.id),
        buttonText: 'Update',
      },
      {
        id: '8eb2f1bd-e5df-48db-822a-2e7de2f474a5',
        cardTitle: 'Budgets',
        subTitles: ['Refresh all transactions from YNAB and store results'],
        onClick: () => AdminAgent.updateBudgets(selectedBudget.id),
        buttonText: 'Update',
      },
    ];
  }

  // TODO type this as a Budget
  public convertBudgetsToDisplayData(budgets: any) {
    const convertedBudgets = budgets.map((budget: any) => ({
      id: budget.id,
      cardTitle: budget.name,
      onClick: () => {
        this.setState({ selectedBudget: budget });
        this.dispatchToStore();
      },
      buttonText: `Select ${budget.name}`,
    }));
    this.setState({ budgets: convertedBudgets });
  }

  public render() {
    const { selectedBudget, selectedAction: selectedSection } = this.state;
    const { id, name } = selectedBudget || { id: null, name: null };
    return (
      <div>
        <div>
          <GridDisplay displayData={this.state.budgets} />
        </div>
        <div>
          {/* TODO make this a nice transition when it shows up */}
          <div>
            {selectedSection === AdminActions.DataUpdater && (
              <React.Fragment>
                <h3>Refresh Options for {name}</h3>
                <GridDisplay displayData={this.getButtonsToRender()} />
              </React.Fragment>
            )}
            {selectedSection === AdminActions.UserManagement && <UserManagement budgetId={id} />}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AdminPage);
