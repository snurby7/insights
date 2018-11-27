import React from 'react';
import Accounts from './accounts/accounts';

class BudgetHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                Budget Home {this.props.budgetId}
                <Accounts budgetId={this.props.budgetId}/>
            </div>
        );
    }
}

export default BudgetHome;