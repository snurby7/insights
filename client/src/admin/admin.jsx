import React from "react";
import Button from "@material-ui/core/Button";
import ApiUtility from "../utilities/api-utility";

function renderRefreshButton(props) {
  const hasDisabledKey = Object.keys(props).some(x => x === "isDisabled");
  return (
    <Button
      key={props.id}
      variant={props.variant}
      color={props.color}
      disabled={hasDisabledKey ? props.isDisabled : !props.budgetId}
      onClick={() => props.onClick()}
    >
      {props.displayValue}
    </Button>
  );
}

function renderBudgetButton(props, callback) {
  return (
    <Button key={props.id} onClick={() => callback()}>
      {props.name}
    </Button>
  );
}

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      budgetId: null
    };
  }

  getButtonsToRender() {
    const budgetId = this.state.budgetId;
    return [
      {
        id: 1,
        displayValue: "Refresh Payees",
        budgetId,
        onClick: () => this.refreshData("/api/admin/update/payees")
      },
      {
        id: 2,
        displayValue: "Refresh Accounts",
        budgetId,
        onClick: () => this.refreshData("/api/admin/update/accounts")
      },
      {
        id: 3,
        displayValue: "Refresh Transactions",
        budgetId,
        onClick: () => this.refreshData("/api/admin/update/transactions")
      },
      {
        id: 4,
        displayValue: "Refresh Categories",
        budgetId,
        onClick: () => this.refreshData("/api/admin/update/categories")
      },
      {
        id: 5,
        displayValue: "Refresh Budgets",
        isDisabled: false,
        onClick: () => this.refreshData("/api/admin/update/budgets")
      }
    ];
  }

  componentDidMount() {
    ApiUtility.getRequest("/api/budgets").then(budgets => {
      this.setState({ budgets });
    });
  }

  refreshData(route) {
    const budgetId = this.state.budgetId;
    ApiUtility.postRequest(route, { budgetId }).then(
      success => {
        console.log(success);
      },
      error => console.log(error)
    );
  }

  render() {
    return (
      <React.Fragment>
        <div>
          Welcome to the Admin AdminPage Styling will be coming soon!
          <div>
            <div>
              {this.state.budgets.map(budget =>
                renderBudgetButton(budget, () =>
                  this.setState({ budgetId: budget.id })
                )
              )}
            </div>
            <div>
              {this.getButtonsToRender().map(button =>
                renderRefreshButton(button)
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
