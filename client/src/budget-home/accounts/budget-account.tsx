import React from "react";
import YnabDataUtility from "../../utilities/ynab-data-utility";
import { IAccount } from "../../contracts/account.interface";

class BudgetAccount extends React.Component<IAccount> {
  render() {
    const props = this.props;
    return (
      <div>
        {props.name} - ({YnabDataUtility.format(props.balance)})
      </div>
    );
  }
}

export default BudgetAccount;
