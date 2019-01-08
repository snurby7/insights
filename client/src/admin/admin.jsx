import React from "react";
import GridDisplay from "../common/grid-display";
import AdminAgent from "../agents/admin-agent";
import RbButton from "../common/rb-button";
import UserManagement from "./management/user-management";

import AdminActions from "./admin-actions";
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
        onClick: () =>
          this.setState({ selectedSection: AdminActions.DataUpdaters })
      },
      {
        displayName: "User Management",
        onClick: () =>
          this.setState({ selectedSection: AdminActions.UserManagement })
      }
    ];
  }

  getButtonsToRender() {
    return [
      {
        id: "6f4c9a94-01c7-48e1-b1d1-2553f5d731d4",
        cardTitle: "Payees",
        subTitles: ["Refresh all payees from YNAB and store results"],
        onClick: () => AdminAgent.updatePayees(this.state.selectedBudget.id),
        buttonText: "Update"
      },
      {
        id: "a9a59754-bd48-481c-8b38-2e309dc758c4",
        cardTitle: "Accounts",
        subTitles: ["Refresh all accounts from YNAB and store results"],
        onClick: () => AdminAgent.updateAccounts(this.state.selectedBudget.id),
        buttonText: "Update"
      },
      {
        id: "c359aa34-36e8-495b-b8dd-03369dca603b",
        cardTitle: "Transactions",
        subTitles: ["Refresh all transactions from YNAB and store results"],
        onClick: () =>
          AdminAgent.udateTransactions(this.state.selectedBudget.id),
        buttonText: "Update"
      },
      {
        id: "65085516-7d61-4a6c-af2b-332cda839434",
        cardTitle: "Categories",
        subTitles: ["Refresh all categories from YNAB and store results"],
        onClick: () =>
          AdminAgent.updateCategories(this.state.selectedBudget.id),
        buttonText: "Update"
      },
      {
        id: "8eb2f1bd-e5df-48db-822a-2e7de2f474a5",
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
            {selectedSection === AdminActions.DataUpdaters && (
              <React.Fragment>
                <h3>Refresh Options for {name}</h3>
                <GridDisplay displayData={this.getButtonsToRender()} />
              </React.Fragment>
            )}
            {selectedSection === AdminActions.UserManagement && <UserManagement budgetId={id} />}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
