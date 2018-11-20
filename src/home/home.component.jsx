import React from 'react';
import YnabService from '../ynab/ynab.service';

function renderBudgetTile(budgets) {
    return budgets.map(budget => {
        return (
            <li key={budget.id}>
                {budget.name}
            </li>
        )
    })
}


class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            budgets: [],
            api: YnabService.getYnabApi()
        }

    }
    render() {
        return (
            <div>
                <ol>
                    {renderBudgetTile(this.state.budgets)}
                </ol>
            </div>
         );
    }

    componentDidMount() {
        YnabService.getBudgets(this.state.api)
            .then(response => this.setState({budgets: response.data.budgets}))
    }
}

export default HomePage;