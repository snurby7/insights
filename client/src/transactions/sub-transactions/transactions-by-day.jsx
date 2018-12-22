import React from "react";
import ApiUtility from "../../utilities/api-utility";
import InsightRoutes from "../../common/routes";

class TransactionsByDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetId: props.budgetId,
      aggregations: {}
    };
  }
  render() {
    return(
      <div>State.Aggregations currenlty holds an object</div>
    );
  }

  componentDidMount() {
    ApiUtility.getRequest(
      InsightRoutes.getTransactionsByDay,
      {
        budgetId: this.state.budgetId
      },
      aggregations => this.setState({aggregations})
    );
  }
}

export default TransactionsByDay;
