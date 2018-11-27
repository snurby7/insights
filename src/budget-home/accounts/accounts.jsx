import React from 'react';
import YnabService from '../../ynab/ynab.service';

function renderBudgetAccount(props) {
    return (
        !props.closed && <div key={props.id}>
            {props.name} - ${props.balance / 1000 }
        </div>
    )
}

class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        }
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
        YnabService
            .getAccounts(this.props.budgetId)
            .then(response => this.setState({accounts: response.data.accounts}))
    }
}

export default Accounts;