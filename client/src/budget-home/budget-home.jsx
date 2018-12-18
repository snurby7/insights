import Button from "@material-ui/core/Button";
import React from 'react';
import {Redirect} from 'react-router'
import Accounts from './accounts/accounts';
import Categories from './categories/categories';

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
                <Button onClick={() => this.setState({routeExtension: 'life-energy'})}>View Life Energy</Button>
                <Button onClick={() => this.setState({routeExtension: 'payees'})}>View Payees</Button>
                <Button onClick={() => this.setState({routeExtension: 'transactions'})}>View Transactions</Button>
                <div className="element-container">
                    <Accounts budgetId={this.props.budgetId}/>
                    <Categories budgetId={this.props.budgetId}/>
                </div>
            </div>
        );
    }
}

export default BudgetHome;