import React, { Component } from 'react';

import { ICategoryViewProps } from '..';
import FundingByCategory from '../components/funding/FundingByCategory';
import SpendingReportByCategory from '../components/spending-report/SpendingReportByCategory';
import TransactionsByCategory from '../components/transactions/TransactionsByCategory';

/**
 * @description Component used to view a given category to tweeze out more information
 * ! TODO: Using the categoryId get transactions over last three months or so
 * ! TODO: Aggregate the last three months to find an average spending on that category.
 * ! TODO: Show the amount of funding a given category is receiving
 * @class CategoryView
 * @extends {Component<ICategoryViewProps>}
 */

export default class CategoryViewPage extends Component<ICategoryViewProps> {
  public render() {
    return (
      <div>
        <SpendingReportByCategory {...this.props} />
        <TransactionsByCategory {...this.props} />
        <FundingByCategory {...this.props} />
      </div>
    );
  }
}
