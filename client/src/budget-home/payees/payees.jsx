import React from 'react';
import ApiUtility from '../../utilities/api-utility';

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
        this.getPayees(`/api/payees`, this.props.budgetId);
    }

    async getPayees(route, budgetId) {
        ApiUtility.getRequest(route, {
            budgetId
        }, (payees) => this.setState({payees: payees, masterPayees: payees}))
    };
}

export default Payees;