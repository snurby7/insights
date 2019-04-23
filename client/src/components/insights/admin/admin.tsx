import React from 'react';
import { connect } from 'react-redux';

import AdminAgent from '../../../agents/admin-agent';
import { ICardDisplay, IReducerAction } from '../../../contracts';
import { GridDisplay } from '../../common';

interface IAdminProps {
  dispatch: (action: IReducerAction) => void;
  budgetId: string;
}

class AdminPage extends React.Component<IAdminProps> {
  public getButtonsToRender(): ICardDisplay[] {
    const { budgetId } = this.props;
    return [
      {
        id: '6f4c9a94-01c7-48e1-b1d1-2553f5d731d4',
        cardTitle: 'Payees',
        subTitles: ['Refresh all payees from YNAB and store results'],
        onAsyncClick: () => AdminAgent.updatePayees(budgetId),
        buttonText: 'Update',
      },
      {
        id: 'a9a59754-bd48-481c-8b38-2e309dc758c4',
        cardTitle: 'Accounts',
        subTitles: ['Refresh all accounts from YNAB and store results'],
        onAsyncClick: () => AdminAgent.updateAccounts(budgetId),
        buttonText: 'Update',
      },
      {
        id: 'c359aa34-36e8-495b-b8dd-03369dca603b',
        cardTitle: 'Transactions',
        subTitles: ['Refresh all transactions from YNAB and store results'],
        onAsyncClick: () => AdminAgent.udateTransactions(budgetId),
        buttonText: 'Update',
      },
      {
        id: '65085516-7d61-4a6c-af2b-332cda839434',
        cardTitle: 'Categories',
        subTitles: ['Refresh all categories from YNAB and store results'],
        onAsyncClick: () => AdminAgent.updateCategories(budgetId),
        buttonText: 'Update',
      },
      {
        id: '8eb2f1bd-e5df-48db-822a-2e7de2f474a5',
        cardTitle: 'Budgets',
        subTitles: ['Refresh all transactions from YNAB and store results'],
        onAsyncClick: () => AdminAgent.updateBudgets(budgetId),
        buttonText: 'Update',
      },
    ];
  }

  public render() {
    return (
      <div>
        <h3>Refresh Options</h3>
        <GridDisplay displayData={this.getButtonsToRender()} />
      </div>
    );
  }
}

export default connect()(AdminPage);
