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
      users: [],
      selectedUser: null
    };
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.addUser()}>Add User</Button>
        {this.state.users.map(user => (
          <div key={user._id}>
            <User data={user} />
            <Button onClick={() => this.deleteUser(user._id)}>
              Delete
            </Button>
            <Button onClick={() => this.editUser(user)}>Edit</Button>
          </div>
        ))}
        {this.state.openDialog && <UserDialog
          budgetId={this.props.budgetId}
          open={this.state.openDialog}
          user={this.state.selectedUser}
          onClose={data => this.onDialogClose(data)}
        />}
      </div>
    );
  }

  componentDidMount() {
    this.getUsersForDisplay();
  }

  async getUsersForDisplay() {
    const users = await UserAgent.getUsers(this.props.budgetId);
    this.setState({ users });
  }

  addUser() {
    this.setState({
      selectedUser: null,
      openDialog: true
    });
  }

  onDialogClose(fireRefresh) {
    this.setState({ openDialog: false, selectedUser: null });
    if (fireRefresh) {
      this.getUsersForDisplay();
    }
  }

  async deleteUser(userId) {
    await UserAgent.deleteUser(userId);
    this.getUsersForDisplay();
  }

  editUser(selectedUser) {
    this.setState({ selectedUser });
    this.setState({ openDialog: true });
  }
}

export default UserManagement;
