import React from "react";
import YnabDataUtility from "../../utilities/ynab-data-utility";
import YnabAgent from "../../agents/ynab-agent";

function renderBudgetAccount(props) {
  if (props.closed) return null;
  return (
    <div key={props.id}>
      {props.name} - ({YnabDataUtility.format(props.balance)})
    </div>
  );
}

class Accounts extends React.Component {
  state = {
    accounts: []
  };

  async getAccountsByBudgetId(budgetId) {
    const accounts = await YnabAgent.getAccounts({ budgetId });
    this.setState({ accounts });
  }

  render() {
    return (
      <div>
        <h3>Accounts</h3>
        {this.state.accounts.map(account => renderBudgetAccount(account))}
      </div>
    );
  }

  componentDidMount() {
    const budgetId = this.props.budgetId;
    this.getAccountsByBudgetId(budgetId);
  }
}

export default Accounts;
