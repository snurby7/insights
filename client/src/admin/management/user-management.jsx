import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import UserDialog from "./user-dialog";
import UserAgent from "../../agents/user-agent";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

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
    const { classes } = this.props;
    const { openDialog, selectedUser, users} = this.state;
    return (
      <div>
        <div className={classes.root}>
          <List component="nav">
            {users.map(user => (
              <React.Fragment  key={user._id}>
                <ListItem>
                  <ListItemText>{user.name}</ListItemText>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => this.editUser(user)}
                  >
                    <Icon>edit_icon</Icon>
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => this.deleteUser(user._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          {openDialog && (
            <UserDialog
              budgetId={this.props.budgetId}
              open={openDialog}
              user={selectedUser}
              onClose={data => this.onDialogClose(data)}
            />
          )}
          <Button onClick={() => this.addUser()}>Add User</Button>
        </div>
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

UserManagement.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserManagement);
