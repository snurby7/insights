import React from 'react';

import MonthlyExpenseCategory from '../report-types/MonthlyExpenseCategory';

export interface IReportsHomeProps {
  budgetId: string;
}

class ReportsHomePage extends React.Component<IReportsHomeProps> {
  public render() {
    const { budgetId } = this.props;
    return (
      <div>
        <MonthlyExpenseCategory budgetId={budgetId} />
      </div>
    );
  }
}

export default ReportsHomePage;
