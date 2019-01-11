import React from "react";
import PropTypes from "prop-types";

import Accounts from "./accounts/accounts";
import Categories from "./categories/categories";
import RbButton from "../common/rb-button";

import LifeEnergy from "./life-energy/life-energy";
import Payees from "./payees/payees";
import ReportsHome from "./reports/reports-home";
import Transactions from "./transactions/transactions";

import "./budget-home.css";
import BudgetActions from './budget-actions';

class BudgetHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: BudgetActions.Home
    };
  }

  getRoutingDataForButtons() {
    return [
      {
        displayName: "Home",
        onClick: () => this.setState({ selectedSection: BudgetActions.Home })
      },
      {
        displayName: "View Life Energy",
        onClick: () => this.setState({ selectedSection: BudgetActions.LifeEnergy })
      },
      {
        displayName: "View Payees",
        onClick: () => this.setState({ selectedSection: BudgetActions.Payees })
      },
      {
        displayName: "View Transactions",
        onClick: () => this.setState({ selectedSection: BudgetActions.Transactions })
      },
      {
        displayName: "View Reports",
        onClick: () => this.setState({ selectedSection: BudgetActions.Reports })
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
          {selectedSection === BudgetActions.Home && (
            <React.Fragment>
              <Accounts budgetId={budgetId} />
              <Categories budgetId={budgetId} />
            </React.Fragment>
          )}
          {selectedSection === BudgetActions.LifeEnergy && <LifeEnergy budgetId={budgetId} />}
          {selectedSection === BudgetActions.Payees && <Payees budgetId={budgetId} />}
          {selectedSection === BudgetActions.Transactions && <Transactions budgetId={budgetId} />}
          {selectedSection === BudgetActions.Reports && <ReportsHome budgetId={budgetId} />}
        </div>
      </div>
    );
  }
}

BudgetHome.propTypes = {
  budgetId: PropTypes.string.isRequired
}

export default BudgetHome;
