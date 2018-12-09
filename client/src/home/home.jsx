import React from "react";
import { Redirect } from "react-router";
import ApiUtility from "../utilities/api-utility";
import Button from "@material-ui/core/Button";

function renderBudgetTile(props) {
  return props.budgets.map(budget => (
    <div key={budget.id}>
      <Button onClick={() => props.handleClick(budget.id)}>
        {budget.name}
      </Button>
    </div>
  ));
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      budgetId: null
    };
  }
  render() {
    const { budgetId } = this.state;
    if (budgetId !== null) {
      // seems fishy, sure I'll be able to come back later and figure out how to
      // correctly route.
      const budgetRoute = `/budget/${budgetId}`;
      return <Redirect to={budgetRoute} push={true} />;
    }
    return (
      <div>
        {renderBudgetTile({
          budgets: this.state.budgets,
          handleClick: budgetId => {
            this.setState({ budgetId });
          }
        })}
      </div>
    );
  }

  componentDidMount() {
    this.getBudgets("/api/budgets");
  }

  async getBudgets(route) {
    ApiUtility.getRequest(route, null, budgets => this.setState({ budgets }));
  }
}

export default HomePage;
