import React from 'react';
import Accounts from './accounts/accounts';
import Categories from './categories/categories';
import {Redirect} from 'react-router'

class BudgetHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeExtension: null
        }
    }
    render() {
        if (this.state.routeExtension) {
            const budgetId = this.props.budgetId;
            const route = `/budget/${budgetId}/${this.state.routeExtension}`
            return <Redirect to={route}/>
        }
        return (
            <div>
                <h3>Welcome to your budget Home</h3>
                <button onClick={() => this.setState({routeExtension: 'payees'})}>View Payees</button>
                <button onClick={() => this.setState({routeExtension: 'transactions'})}>View Transactions</button>
                <div className="element-container">
                    <Accounts budgetId={this.props.budgetId}/>
                    <Categories budgetId={this.props.budgetId}/>
                </div>
            </div>
        );
    }
}

export default BudgetHome;