import React from "react";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div>
          Welcome to the Admin Page more coming soon
          <div>
            Eventually you will be able to do the following
            <ol>
              <li>Update The Categories</li>
              <li>Update Account Balances</li>
              <li>Update all transactions</li>
              <li>Update all payees</li>
            </ol>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
