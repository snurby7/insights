import React from 'react';
import YnabService from '../../ynab/ynab.service';

function renderPayee(props) {
    return (!props.deleted && <li key={props.id}>{props.name}</li>)
}

class Payees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payees: []
        }
    }
    render() {
        return (
            <div>
                <h2>Payees</h2>
                <ol>
                    {this.state.payees.map(x => renderPayee(x))}
                </ol>
            </div>
        );
    }

    componentDidMount() {
        YnabService
            .getPayees(this.props.budgetId)
            .then(response => this.setState({payees: response.data.payees}))
    }
}

export default Payees;