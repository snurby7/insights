import React from 'react';

class BudgetHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
            <div>Budget Home {this.props.budgetId}</div>
         );
    }
}

export default BudgetHome;