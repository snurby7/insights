import React from 'react';

import { YnabAgent } from '../../../../agents';
import { ITransactionsAggregate } from '../../../../contracts';

export interface ITransactionsByDayProps {
  budgetId: string;
}

export interface ITransactionsByDayState {
  aggregations: ITransactionsAggregate[];
}

class TransactionsByDay extends React.Component<ITransactionsByDayProps, ITransactionsByDayState> {
  public componentDidMount() {
    const { budgetId } = this.props;
    // TODO type this
    YnabAgent.getTransactionsByDay(budgetId).then((aggregations: ITransactionsAggregate[]) => {
      this.setState({ aggregations });
    });
  }

  public render() {
    return <div>State.Aggregations currenlty holds an object</div>;
  }
}

export default TransactionsByDay;
