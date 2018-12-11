import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import YnabAppBar from "../common/ynab-app-bar";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <YnabAppBar />
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
