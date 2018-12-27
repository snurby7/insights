import React from "react";
import ApiUtility from "../../utilities/api-utility";
import InsightRoutes from "../../common/api-routes";

class TransactionsByDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetId: props.budgetId,
      aggregations: {}
    };
  }

  async getTransactionsByDay(budgetId) {
    const aggregations = await ApiUtility.getRequest(
      InsightRoutes.getTransactionsByDay,
      { budgetId }
    );
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
