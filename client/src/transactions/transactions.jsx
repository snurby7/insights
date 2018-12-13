import React from 'react';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactsions: {}
     }
  }
  render() {
    return ( <div>
      Transactions
    </div> );
  }
}

export default Transactions;