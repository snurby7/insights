import React from 'react';
import MonthlyExpenseCategory from "./report-types/monthly-expense-category";

class ReportsHome extends React.Component {
  render() {
    return (
      <div>
        <MonthlyExpenseCategory budgetId={this.props.budgetId} />
      </div>
    );
  }
}

export default ReportsHome;
