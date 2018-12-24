import React from "react";
import User from "./user";
import Button from "@material-ui/core/Button";
import UserDialog from "./user-dialog";
class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false
    };
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.addUser()}>Add User</Button>
        <User />
        <UserDialog
          open={this.state.openDialog}
          onClose={data => this.onUserClose(data)}
        />
      </div>
    );
  }

  addUser() {
    this.setState({ openDialog: true });
  }

  onUserClose(data) {
    this.setState({ openDialog: false });
    console.log(data);
  }

  deleteUser() {
    throw Error("not implemented yet");
  }

  editUser() {
    throw Error("not implemented yet");
  }
}

export default UserManagement;
