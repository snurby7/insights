import './budget-home.css';

import React from 'react';

import RbButton, { IRbButtonOptions } from '../common/rb-button';
import Accounts from './accounts/accounts';
import { BudgetActions } from './budget-actions';
import Categories from './categories/categories';
import LifeEnergy from './life-energy/life-energy';
import Payees from './payees/payees';
import ReportsHome from './reports/reports-home';
import Transactions from './transactions/transactions';

export interface IBudgetHomeProps {
  budgetId: string;
}

export interface IBudgetHomeState {
  selectedSection: BudgetActions;
}

class BudgetHome extends React.Component<IBudgetHomeProps, IBudgetHomeState> {
  public state = {
    selectedSection: BudgetActions.Home,
  };

  public getRoutingDataForButtons(): IRbButtonOptions[] {
    return [
      {
        displayName: 'Home',
        onClick: () => this.setState({ selectedSection: BudgetActions.Home }),
      },
      {
        displayName: 'View Life Energy',
        onClick: () => this.setState({ selectedSection: BudgetActions.LifeEnergy }),
      },
      {
        displayName: 'View Payees',
        onClick: () => this.setState({ selectedSection: BudgetActions.Payees }),
      },
      {
        displayName: 'View Transactions',
        onClick: () => this.setState({ selectedSection: BudgetActions.Transactions }),
      },
      {
        displayName: 'View Reports',
        onClick: () => this.setState({ selectedSection: BudgetActions.Reports }),
      },
    ];
  }

  public render() {
    const { selectedSection } = this.state;
    const { budgetId } = this.props;
    return (
      <div>
        <h3>Welcome to your budget Home</h3>
        {this.getRoutingDataForButtons().map((displayData, index) => (
          <RbButton key={index} {...displayData} />
        ))}
        <div className="element-container">
          {selectedSection === BudgetActions.Home && (
            <React.Fragment>
              <Accounts budgetId={budgetId} />
              <Categories budgetId={budgetId} />
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

export default BudgetHome;
