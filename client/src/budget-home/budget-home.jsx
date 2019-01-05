import React from "react";
import Accounts from "./accounts/accounts";
import Categories from "./categories/categories";
import RbButton from "../common/rb-button";

import "./budget-home.css";
import LifeEnergy from "../life-energy/life-energy";
import Payees from "../payees/payees";
import ReportsHome from "../reports/reports-home";
import Transactions from "../transactions/transactions";

class BudgetHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: 1
    };
  }

  getRoutingDataForButtons() {
    // TODO make these an enum instead of some number
    return [
      {
        displayName: "Home",
        onClick: () => this.setState({ selectedSection: 1 })
      },
      {
        displayName: "View Life Energy",
        onClick: () => this.setState({ selectedSection: 2 })
      },
      {
        displayName: "View Payees",
        onClick: () => this.setState({ selectedSection: 3 })
      },
      {
        displayName: "View Transactions",
        onClick: () => this.setState({ selectedSection: 4 })
      },
      {
        displayName: "View Reports",
        onClick: () => this.setState({ selectedSection: 5 })
      }
    ];
  }

  render() {
    const { selectedSection } = this.state;
    const { budgetId } = this.props;
    return (
      <div>
        <h3>Welcome to your budget Home</h3>
        {this.getRoutingDataForButtons().map((displayData, index) => (
          <RbButton key={index} displayData={displayData} />
        ))}
        <div className="element-container">
          {selectedSection === 1 && (
            <React.Fragment>
              <Accounts budgetId={budgetId} />
              <Categories budgetId={budgetId} />
            </React.Fragment>
          )}
          {selectedSection === 2 && <LifeEnergy budgetId={budgetId} />}
          {selectedSection === 3 && <Payees budgetId={budgetId} />}
          {selectedSection === 4 && <Transactions budgetId={budgetId} />}
          {selectedSection === 5 && <ReportsHome budgetId={budgetId} />}
        </div>
      </div>
    );
  }
}

export default BudgetHome;
