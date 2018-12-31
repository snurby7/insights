import React from "react";
import GridDisplay from "../common/grid-display";
import RoutingButton from "../common/routing-button";
import AdminAgent from "../agents/admin-agent";

// TODO make this look less bad.

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      selectedBudget: null
    };
  }

  getButtonsToRender() {
    return [
      {
        id: 1,
        cardTitle: "Payees",
        subTitles: ["Refresh all payees from YNAB and store results"],
        onClick: () => AdminAgent.updatePayees(this.state.selectedBudget.id),
        buttonText: "Update"
      },
      {
        id: 2,
        cardTitle: "Accounts",
        subTitles: ["Refresh all accounts from YNAB and store results"],
        onClick: () => AdminAgent.updateAccounts(this.state.selectedBudget.id),
        buttonText: "Update"
      },
      {
        id: 3,
        cardTitle: "Transactions",
        subTitles: ["Refresh all transactions from YNAB and store results"],
        onClick: () => AdminAgent.udateTransactions(this.state.selectedBudget.id),
        buttonText: "Update"
      },
      {
        id: 4,
        cardTitle: "Categories",
        subTitles: ["Refresh all categories from YNAB and store results"],
        onClick: () => AdminAgent.updateCategories(this.state.selectedBudget.id),
        buttonText: "Update"
      },
      {
        id: 5,
        cardTitle: "Budgets",
        subTitles: ["Refresh all transactions from YNAB and store results"],
        onClick: () => AdminAgent.updateBudgets(this.state.selectedBudget.id),
        buttonText: "Update"
      }
    ];
  }

  convertBudgetsToDisplayData(budgets) {
    const convertedBudgets = budgets.map(budget => ({
      id: budget.id,
      cardTitle: budget.name,
      onClick: () => this.setState({ selectedBudget: budget }),
      buttonText: `Select ${budget.name}`
    }));
    this.setState({ budgets: convertedBudgets });
  }

  componentDidMount() {
    this.getBudgetsForDisplay();
  }

  async getBudgetsForDisplay() {
    const budgets = await AdminAgent.getBudgets();
    this.convertBudgetsToDisplayData(budgets);
  }

  render() {
    const selectedBudget = this.state.selectedBudget;
    const { id, name } = selectedBudget || {};
    const userDisplayData = {
      route: selectedBudget ? `/admin/${id}/users` : null,
      displayName: `Manage users for ${name} `
    };
    return (
      <div>
        <div>
          <GridDisplay displayData={this.state.budgets} />
        </div>
        <div>
          {/* TODO make this a nice transition when it shows up */}
          {selectedBudget && (
            <div>
              <hr />
              <RoutingButton displayData={userDisplayData} />
              <h3>Refresh Options for {name}</h3>
              <GridDisplay displayData={this.getButtonsToRender()} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AdminPage;
