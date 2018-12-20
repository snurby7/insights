import React from "react";
import ApiUtility from "../utilities/api-utility";
import GridDisplay from "../common/grid-display";

// TODO make this look less bad.

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      budgetId: null
    };
  }

  getButtonsToRender() {
    return [
      {
        id: 1,
        cardTitle: "Payees",
        subTitles: ["Refresh all payees from YNAB and store results"],
        onClick: () => this.refreshData("/api/admin/update/payees"),
        buttonText: "Update"
      },
      {
        id: 2,
        cardTitle: "Accounts",
        subTitles: ["Refresh all accounts from YNAB and store results"],
        onClick: () => this.refreshData("/api/admin/update/accounts"),
        buttonText: "Update"
      },
      {
        id: 3,
        cardTitle: "Transactions",
        subTitles: ["Refresh all transactions from YNAB and story results"],
        onClick: () => this.refreshData("/api/admin/update/transactions"),
        buttonText: "Update"
      },
      {
        id: 4,
        cardTitle: "Categories",
        subTitles: ["Refresh all transactions from YNAB and story results"],
        onClick: () => this.refreshData("/api/admin/update/categories"),
        buttonText: "Update"
      },
      {
        id: 5,
        cardTitle: "Budgets",
        subTitles: ["Refresh all transactions from YNAB and story results"],
        onClick: () => this.refreshData("/api/admin/update/budgets"),
        buttonText: "Update"
      }
    ];
  }

  convertBudgetsToDisplayData(budgets) {
    const convertedBudgets = budgets.map(budget => ({
      id: budget.id,
      cardTitle: budget.name,
      onClick: () => this.setState({ budgetId: budget.id }),
      buttonText: `Select ${budget.name}`
    }));
    this.setState({ budgets: convertedBudgets });
  }

  componentDidMount() {
    ApiUtility.getRequest("/api/budgets").then(budgets => {
      this.convertBudgetsToDisplayData(budgets);
    });
  }

  refreshData(route) {
    const budgetId = this.state.budgetId;
    ApiUtility.postRequest(route, { budgetId }).then(
      success => console.log(success),
      () => alert(`${route} request has failed!`)
    );
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div>
            <GridDisplay displayData={this.state.budgets} />
          </div>
          <hr />
          <div>
            {/* TODO make this a nice transition when it shows up */}
            {this.state.budgetId && (
              <div>
                <h3>Actions</h3>
                <GridDisplay displayData={this.getButtonsToRender()} />
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
