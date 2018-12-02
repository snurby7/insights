import React from 'react';
import YnabService from '../../ynab/ynab.service';

function renderPayee(props) {
    return (!props.deleted && <li key={props.id}>{props.name}</li>)
}

class Payees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterPayees: [],
            payees: [],
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
                        .map(x => renderPayee(x))}
                </ol>
            </div>
        );
    }

    componentDidMount() {
        YnabService
            .getPayees(this.props.budgetId)
            .then(response => this.setState({payees: response.data.payees, masterPayees: response.data.payees}))
    }
}

export default Payees;