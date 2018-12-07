import React from 'react';
import {Redirect} from 'react-router'
import ApiUtility from '../utilities/api-utility';

function renderBudgetTile(props) {
    return props
        .budgets
        .map(budget => <li key={budget.id}>
            <button onClick={() => props.handleClick(budget.id)}>{budget.name}</button>
        </li>);
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budgets: [],
            budgetId: null
        }

    }
    render() {
        const {budgetId} = this.state;
        if (budgetId !== null) {
            // seems fishy, sure I'll be able to come back later and figure out how to
            // correctly route.
            const budgetRoute = `/budget/${budgetId}`
            return <Redirect to={budgetRoute} push={true}/>
        }
        return (
            <div>
                <ol>
                    {renderBudgetTile({
                        budgets: this.state.budgets,
                        handleClick: (budgetId) => {
                            this.setState({budgetId})
                        }
                    })}
                </ol>
            </div>
        );
    }

    componentDidMount() {
        this.getBudgets('/api/budgets');
    }

    async getBudgets(route) {
        ApiUtility.getRequest(route, null, (budgets) => this.setState({budgets}) );
    };

}

export default HomePage;