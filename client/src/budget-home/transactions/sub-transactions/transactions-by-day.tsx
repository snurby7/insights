import React from 'react';

import YnabAgent from '../../../agents/ynab-agent';

export interface ITransactionsByDayProps{
 budgetId: string;
}

export interface ITransactionsByDayState{
  aggregations: any
}

class TransactionsByDay extends React.Component<ITransactionsByDayProps, ITransactionsByDayState> {
  componentDidMount() {
    const {budgetId} = this.props;
    // TODO type this
    YnabAgent.getTransactionsByDay(budgetId).then((aggregations: any) => {
      this.setState({aggregations});
    })
  }

  render() {
    return <div>State.Aggregations currenlty holds an object</div>;
  }
}

export default TransactionsByDay;
