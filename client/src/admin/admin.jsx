import React from "react";
import ApiUtility from "../utilities/api-utility";
import GridDisplay from "../common/grid-display";
import InsightRoutes from '../common/api-routes';
import RoutingButton from "../common/routing-button";
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
        onClick: () => this.refreshData(InsightRoutes.postUpdatePayees),
        buttonText: "Update"
      },
      {
        id: 2,
        cardTitle: "Accounts",
        subTitles: ["Refresh all accounts from YNAB and store results"],
        onClick: () => this.refreshData(InsightRoutes.postUpdateAccounts),
        buttonText: "Update"
      },
      {
        id: 3,
        cardTitle: "Transactions",
        subTitles: ["Refresh all transactions from YNAB and store results"],
        onClick: () => this.refreshData(InsightRoutes.postUpdateTransactions),
        buttonText: "Update"
      },
      {
        id: 4,
        cardTitle: "Categories",
        subTitles: ["Refresh all categories from YNAB and store results"],
        onClick: () => this.refreshData(InsightRoutes.postUpdateCategories),
        buttonText: "Update"
      },
      {
        id: 5,
        cardTitle: "Budgets",
        subTitles: ["Refresh all transactions from YNAB and store results"],
        onClick: () => this.refreshData(InsightRoutes.postUpdateBudgets),
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
    const budgets = await ApiUtility.getRequest(InsightRoutes.getBudgets);
    this.convertBudgetsToDisplayData(budgets);
  }

  refreshData(route) {
    const budgetId = this.state.selectedBudget.id;
    ApiUtility.postRequest(route, { budgetId }).then(
      success => console.log(success),
      () => alert(`${route} request has failed!`)
    );
  }

  render() {
    const selectedBudget = this.state.selectedBudget;
    const {id, name} = selectedBudget || {};
    const userDisplayData = {
      route: selectedBudget ? `/admin/${id}/users`: null,
      displayName: `Manage users for ${name} `
    }
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
              <RoutingButton displayData={userDisplayData}/>
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
