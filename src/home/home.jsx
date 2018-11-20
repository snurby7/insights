import React from 'react';
import YnabService from '../ynab/ynab.service';

function renderBudgetTile(props) {
    return props.budgets.map(budget => {
        return (
            <li key={budget.id}>
                <button onClick={() => props.handleClick(budget.id)}>{budget.name}</button>
            </li>
        )
    })
}


class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            budgets: []
        }

    }
    render() {
        return (
            <div>
                <ol>
                    {renderBudgetTile({
                        budgets: this.state.budgets,
                        handleClick: (budgetId) => {this.updateStateAndRoute(budgetId)}
                    })}
                </ol>
            </div>
         );
    }

    componentDidMount() {
        YnabService.getBudgets(this.state.api)
            .then(response => this.setState({budgets: response.data.budgets}))
    }

    updateStateAndRoute = (budgetId) => {
        this.props.onRoute(budgetId);
    }
}

export default HomePage;