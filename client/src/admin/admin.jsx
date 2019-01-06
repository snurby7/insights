import React from "react";
import GridDisplay from "../common/grid-display";
import AdminAgent from "../agents/admin-agent";
import RbButton from "../common/rb-button";
import UserManagement from "./management/user-management";
// TODO make this look less bad.
// TODO make this behave like the budget home does now and it all uses the same page
// TODO make this have some sort of props.context or this.context so I don't need to select a budgetId every time

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      selectedBudget: null,
      selectedSection: null
    };
  }

  getDisplayToggles() {
    // TODO make these an enum instead of some number
    return [
      {
        displayName: "Data Updaters",
        onClick: () => this.setState({ selectedSection: 1 })
      },
      {
        displayName: "User Management",
        onClick: () => this.setState({ selectedSection: 2 })
      }
    ];
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
        onClick: () =>
          AdminAgent.udateTransactions(this.state.selectedBudget.id),
        buttonText: "Update"
      },
      {
        id: 4,
        cardTitle: "Categories",
        subTitles: ["Refresh all categories from YNAB and store results"],
        onClick: () =>
          AdminAgent.updateCategories(this.state.selectedBudget.id),
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
    const { selectedBudget, selectedSection } = this.state;
    const { id, name } = selectedBudget || {};
    return (
      <div>
        <div>
          <GridDisplay displayData={this.state.budgets} />
        </div>
        <div>
          {selectedBudget && (
            <React.Fragment>
              {this.getDisplayToggles().map((x, index) => (
                <RbButton key={index} displayData={x} />
              ))}
              <hr />
            </React.Fragment>
          )}
        </div>
        <div>
          {/* TODO make this a nice transition when it shows up */}
          <div>
            {selectedSection === 1 && (
              <React.Fragment>
                <h3>Refresh Options for {name}</h3>
                <GridDisplay displayData={this.getButtonsToRender()} />
              </React.Fragment>
            )}
            {selectedSection === 2 && <UserManagement budgetId={id} />}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
