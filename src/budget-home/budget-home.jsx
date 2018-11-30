import React from 'react';
import Accounts from './accounts/accounts';
import Categories from './categories/categories';
import {Redirect} from 'react-router'

class BudgetHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newRouteExtension: null
        }
    }
    render() {
        if (this.state.newRouteExtension) {
            const budgetId = this.props.budgetId;
            const payeesRoute = `/budget/${budgetId}/${this.state.newRouteExtension}`
            return <Redirect to={payeesRoute}/>
        }
        return (
            <div>
                <h3>Welcome to your budget Home</h3>
                <button onClick={() => this.setState({newRouteExtension: 'payees'})}>View Payees</button>
                <div className="element-container">
                    <Accounts budgetId={this.props.budgetId}/>
                    <Categories budgetId={this.props.budgetId}/>
                </div>
            </div>
        );
    }
}

export default BudgetHome;