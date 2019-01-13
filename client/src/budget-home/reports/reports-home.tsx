import React from 'react';

import MonthlyExpenseCategory from './report-types/monthly-expense-category';

export interface IReportsHomeProps {
  budgetId: string;
}

class ReportsHome extends React.Component<IReportsHomeProps> {
  public render() {
    const { budgetId } = this.props;
    return (
      <div>
        <MonthlyExpenseCategory budgetId={budgetId} />
      </div>
    );
  }
}

export default ReportsHome;
