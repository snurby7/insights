import React from "react";
import ApiUtility from "../../utilities/api-utility";

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
      "/api/transactions/aggregate",
      {
        budgetId: this.state.budgestId
      },
      aggregations => this.setState({aggregations})
    );
  }
}

export default TransactionsByDay;
