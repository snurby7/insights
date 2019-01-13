import React from 'react';

import TransactionsByDay from './sub-transactions/transactions-by-day';

export interface ITransactionsProps {
  budgetId: string;
}

class Transactions extends React.Component<ITransactionsProps> {
  render() {
    const { budgetId } = this.props;
    return ( <div>
      <TransactionsByDay budgetId={budgetId}/>
    </div> );
  }
}

export default Transactions;