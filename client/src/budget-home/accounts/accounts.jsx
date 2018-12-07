import React from 'react';
import ApiUtility from '../../utilities/api-utility';

function renderBudgetAccount(props) {
    if(props.closed) return null;
    return (
        <div key={props.id}>
            {props.name} - ${props.balance / 1000 }
        </div>
    )
}

class Accounts extends React.Component {
    state = {
        accounts: []
    }

    render() {
        return (
            <div>
                <h3>Accounts</h3>
                {this.state.accounts.map(account => renderBudgetAccount(account))}
            </div>
        );
    }

    componentDidMount() {
        this.getAccounts(`/api/accounts`, this.props.budgetId);
    }

    async getAccounts(route, budgetId) {
        await ApiUtility.getRequest(route, {budgetId}, (accounts) => this.setState({accounts}));
    };
}

export default Accounts;