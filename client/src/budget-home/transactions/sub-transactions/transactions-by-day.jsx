import React from "react";
import YnabAgent from "../../../agents/ynab-agent";

class TransactionsByDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetId: props.budgetId,
      aggregations: {}
    };
  }

  async getTransactionsByDay(budgetId) {
    const aggregations = await YnabAgent.getTransactionsByDay(budgetId);
    this.setState({ aggregations });
  }

  render() {
    return <div>State.Aggregations currenlty holds an object</div>;
  }

  componentDidMount() {
    this.getTransactionsByDay(this.props.budgetId);
  }
}

export default TransactionsByDay;
