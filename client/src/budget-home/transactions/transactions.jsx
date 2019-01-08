import React from 'react';
import TransactionsByDay from './sub-transactions/transactions-by-day';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: {},
      budgetId: props.budgetId
     }
  }
  render() {
    return ( <div>
      <TransactionsByDay budgetId={this.state.budgetId}/>
    </div> );
  }
}

export default Transactions;