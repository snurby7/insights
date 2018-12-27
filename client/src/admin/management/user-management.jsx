import React from "react";
import User from "./user";
import Button from "@material-ui/core/Button";
import UserDialog from "./user-dialog";
import UserAgent from "../../agents/user-agent";
class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      users: []
    };
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.addUser()}>Add User</Button>
        {this.state.users.map((user) => <User key={user._id} data={user}/>)}
        <UserDialog
          open={this.state.openDialog}
          onClose={data => this.onUserClose(data)}
        />
      </div>
    );
  }

  componentDidMount() {
    this.getUsersForDisplay();
  }

  async getUsersForDisplay() {
    const users = await UserAgent.getUsers();
    this.setState({users});
  }

  addUser() {
    this.setState({ openDialog: true });
  }

  onUserClose(data) {
    this.setState({ openDialog: false });
    if(data) {
      this.getUsersForDisplay();
      // TODO Refresh the users
    }
  }

  deleteUser() {
    throw Error("not implemented yet");
  }

  editUser() {
    throw Error("not implemented yet");
  }
}

export default UserManagement;
