import React from 'react';
import PropTypes from 'prop-types';

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

ReportsHome.propTypes = {
  budgetId: PropTypes.string.isRequired
}

export default ReportsHome;
