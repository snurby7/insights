import React from "react";
import Button from "@material-ui/core/Button";
import ApiUtility from "../utilities/api-utility";

function renderButton(props) {
  return (
    <Button
      key={props.id}
      variant={props.variant}
      color={props.color}
      onClick={() => props.onClick()}
    >
      {props.displayValue}
    </Button>
  );
}

function renderBudgetButton(props, callback) {
  return (<Button
    key={props.id}
    onClick={() => callback()}
  >
    {props.name}
  </Button>)
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
    const buttonData = [];
    buttonData.push({
      id: 1,
      displayValue: "Refresh Payees",
      onClick: () => this.refreshData("/api/admin/updatePayees")
    });
    return buttonData;
  }

  componentDidMount() {
    ApiUtility.getRequest("/api/budgets").then(budgets => {
      this.setState({ budgets });
    });
  }

  refreshData(route) {
    const budgetId = this.state.budgetId;
    if(budgetId === null) throw Error('budgetId is null, disable the button Ryan')
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
          Welcome to the Admin Page more coming soon
          <div>
            <div>
              {this.state.budgets.map(budget => renderBudgetButton(budget, () => this.setState({budgetId: budget.id})))}
            </div>
            <ol>
              {this.getButtonsToRender().map(button => renderButton(button))}
              <li>Update The Categories</li>
              <li>Update Account Balances</li>
              <li>Update all transactions</li>
              <li>Update all payees</li>
            </ol>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
