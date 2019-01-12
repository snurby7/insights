import React from "react";
import YnabAgent from "../../agents/ynab-agent";
import BudgetAccount from "./budget-account";
import { IAccount } from "../../contracts/account.interface";

export interface IAccountsProps {
  budgetId: string;
}

export interface IAccountsState {
  accounts: IAccount[]; // TODO this shouldn't be an array of any need an IAccount[]
}

class Accounts extends React.Component<IAccountsProps, IAccountsState> {
  state = {
    accounts: [] as IAccount[]
  }

  render() {
    const {accounts} = this.state;
    return (
      <div>
        <h3>Accounts</h3>
        {accounts.map(props => (
          <BudgetAccount key={props.id} {...props} />
        ))}
      </div>
    );
  }

  componentDidMount() {
    const { budgetId } = this.props;
    YnabAgent.getAccounts(budgetId).then(accounts => {
      this.setState({ accounts });
    });
  }
}

export default Accounts;
