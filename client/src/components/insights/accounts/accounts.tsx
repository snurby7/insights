import React from 'react';

import YnabAgent from '../../../agents/ynab-agent';
import { IAccount } from '../../../contracts';
import BudgetAccount from './budget-account';

export interface IAccountsProps {
  budgetId: string;
}

export interface IAccountsState {
  accounts: IAccount[];
}

class Accounts extends React.Component<IAccountsProps, IAccountsState> {
  public state = {
    accounts: [] as IAccount[],
  };

  public render() {
    const { accounts } = this.state;
    return (
      <div>
        <h3>Accounts</h3>
        {accounts.map(props => (
          <BudgetAccount key={props.id} {...props} />
        ))}
      </div>
    );
  }

  public componentDidMount() {
    const { budgetId } = this.props;
    YnabAgent.getAccounts(budgetId).then(accounts => {
      this.setState({ accounts });
    });
  }
}

export default Accounts;
