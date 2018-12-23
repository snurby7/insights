import React from "react";
import User from "./user";
import Button from "@material-ui/core/Button";
class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.addUser()}>Add User</Button>
        <User />
      </div>
    );
  }

  addUser() {
    // TODO Dialog
    throw Error('not implemented yet');
  }

  deleteUser() {
    throw Error('not implemented yet');
  }

  editUser() {
    throw Error('not implemented yet');
  }
}

export default UserManagement;
