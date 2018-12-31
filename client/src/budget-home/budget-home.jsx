import React from 'react';
import Accounts from './accounts/accounts';
import Categories from './categories/categories';
import RoutingButton from "../common/routing-button";

class BudgetHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budgetId: props.budgetId
        }
    }

    getRoutingDataForButtons() {
        const baseRoute = `/budget/${this.props.budgetId}`;
        return [{
            route: `${baseRoute}/life-energy`,
            displayName: 'View Life Energy'
        },{
            route: `${baseRoute}/payees`,
            displayName: 'View Payees'
        },{
            route: `${baseRoute}/transactions`,
            displayName: 'View Transactions'
        },{
            route: `${baseRoute}/reports`,
            displayName: 'View Reports'
        }]
    }

    render() {
        return (
            <div>
                <h3>Welcome to your budget Home</h3>
                {this.getRoutingDataForButtons().map((displayData, index) => {
                    return (<RoutingButton key={index} displayData={displayData}/>)
                })}
                <div className="element-container">
                    <Accounts budgetId={this.props.budgetId}/>
                    <Categories budgetId={this.props.budgetId}/>
                </div>
            </div>
        );
    }
}

export default BudgetHome;