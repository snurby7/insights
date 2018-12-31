import React from 'react';
import MonthlyExpenseCategory from "./report-types/monthly-expense-category";

class ReportsHome extends React.Component {
  render() {
    return (
      <div>
        Reports Home
        <MonthlyExpenseCategory budgetId={this.props.budgetId} />
      </div>
    );
  }
}

export default ReportsHome;
