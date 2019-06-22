import React from 'react';

import FundingByCategory from './components/funding/FundingByCategory';
import SpendingReportByCategory from './components/spending-report/SpendingReportByCategory';
import TransactionsByCategory from './components/transactions/TransactionsByCategory';

export interface ICategoryViewProps {
  categoryId: string;
  budgetId: string;
}

export const CategoryView = (props: ICategoryViewProps) => {
  return (
    <div>
      <SpendingReportByCategory {...props} />
      <TransactionsByCategory {...props} />
      <FundingByCategory {...props} />
    </div>
  );
};
