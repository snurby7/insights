import React from 'react';
import Accounts from './accounts/accounts';
import Categories from './categories/categories';

class BudgetHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                Budget Home {this.props.budgetId}
                <div className="element-container">
                    <Accounts budgetId={this.props.budgetId}/>
                    <Categories budgetId={this.props.budgetId}/>
                </div>
            </div>
        );
    }
}

export default BudgetHome;