import React from 'react';
import ApiUtility from '../utilities/api-utility';
import Button from '@material-ui/core/Button';
import TransactionsDialog from './transactions/transactions-dialog';

function renderPayee(props) {
    return (!props.payee.deleted && <li key={props.payee.id}>{props.payee.name}
        <Button onClick={() => props.onClick(props.payee)} variant="outlined">Transactions</Button>
    </li>)
}

class Payees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterPayees: [],
            open: false,
            payees: [],
            selectedPayee: {},
            transactions: [],
            value: ''
        }
    }

    handleInputChange(event) {
        const inputValue = event.target.value;
        if (inputValue === "") {
            this.setState({payees: this.state.masterPayees})
        } else {
            this.setState({
                payees: this
                    .state
                    .masterPayees
                    .filter(x => x.name.toLowerCase().includes(inputValue.toLowerCase()))
            })
        }
        this.setState({value: event.target.value})
    }

    handleClickOpen(selectedPayee) {
        this.setState({selectedPayee})
        ApiUtility.getRequest('/api/transactions/payee', {
            budgetId: this.props.budgetId,
            payeeId: selectedPayee.id
        }, (transactions) => this.setState({open: true, transactions}))
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <h2>Payees</h2>
                <label>Name:
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={(event) => this.handleInputChange(event)}/>
                </label>
                <ol>
                    {this
                        .state
                        .payees
                        .map(x => renderPayee({
                            payee: x,
                            onClick: (payee) => this.handleClickOpen(payee)
                        }))}
                </ol>
                <TransactionsDialog
                    onClose={() => this.setState({open: false})}
                    selectedPayee={this.state.selectedPayee}
                    transactions={this.state.transactions}
                    open={this.state.open}>
                </TransactionsDialog>
            </div>
        );
    }

    componentDidMount() {
        this.getPayees(`/api/payees`, this.props.budgetId);
    }

    async getPayees(route, budgetId) {
        ApiUtility.getRequest(route, {
            budgetId
        }, (payees) => this.setState({payees: payees, masterPayees: payees}))
    };
}

export default Payees;