import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import ApiUtility from "../utilities/api-utility";

function renderRefreshButton(props) {
  const hasDisabledKey = Object.keys(props).some(x => x === "isDisabled");
  return (
    <Button
      key={props.id}
      variant={props.variant}
      color={props.color}
      disabled={hasDisabledKey ? props.isDisabled : !props.budgetId}
      onClick={() => props.onClick(props.route)}
    >
      {props.loadingState[props.route] && <CircularProgress/>}{props.displayValue}
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
      budgetId: null,
      loadingState: {}
    };
  }

  getButtonsToRender() {
    const {loadingState, budgetId} = this.state;
    return [
      {
        id: 1,
        displayValue: "Refresh Payees",
        budgetId,
        loadingState,
        route: "/api/admin/update/payees",
        onClick: (route) => this.refreshData(route)
      },
      {
        id: 2,
        displayValue: "Refresh Accounts",
        budgetId,
        loadingState,
        route: "/api/admin/update/accounts",
        onClick: (route) => this.refreshData(route)
      },
      {
        id: 3,
        displayValue: "Refresh Transactions",
        budgetId,
        loadingState,
        route: "/api/admin/update/transactions",
        onClick: (route) => this.refreshData(route)
      },
      {
        id: 4,
        displayValue: "Refresh Categories",
        budgetId,
        loadingState,
        route: "/api/admin/update/categories",
        onClick: (route) => this.refreshData(route)
      },
      {
        id: 5,
        displayValue: "Refresh Budgets",
        isDisabled: false,
        loadingState,
        route: "/api/admin/update/budgets",
        onClick: (route) => this.refreshData(route)
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
    const loadingState = this.state.loadingState;
    loadingState[route] = true;
    this.setState({loadingState});
    ApiUtility.postRequest(route, { budgetId }).then(
      success => console.log(success),
      () => alert(`${route} request has failed!`)
    ).finally(() => {
      loadingState[route] = false
      this.setState({loadingState});
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          Welcome to the AdminPage Styling will be coming soon!
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
