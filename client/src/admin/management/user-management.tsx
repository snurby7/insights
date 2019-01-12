import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

import UserAgent from '../../agents/user-agent';
import { IUser } from '../../contracts/user.interface';
import UserDialog from './user-dialog';

const styles = (theme: any) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

export interface IUserManagementProps {
  classes: any;
  budgetId: string;
}

export interface IUserManagementState {
  openDialog: boolean;
  users: IUser[];
  selectedUser: IUser | undefined;
}

class UserManagement extends React.Component<
  IUserManagementProps,
  IUserManagementState
> {
  state = {
    openDialog: false,
    users: [] as IUser[],
    selectedUser: undefined
  };

  render() {
    const { classes } = this.props;
    const { openDialog, selectedUser, users } = this.state;
    return (
      <div>
        <div className={classes.root}>
          <List component="nav">
            {users.map(user => (
              <React.Fragment key={user._id}>
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

  getUsersForDisplay() {
    UserAgent.getUsers(this.props.budgetId).then(users => {
      this.setState({ users });
    });
  }

  addUser() {
    this.setState({
      selectedUser: undefined,
      openDialog: true
    });
  }

  onDialogClose(fireRefresh?: boolean) {
    this.setState({
      openDialog: false,
      selectedUser: undefined
    });
    if (fireRefresh) {
      this.getUsersForDisplay();
    }
  }

  deleteUser(userId: string | undefined) {
    if (!userId) return;
    UserAgent.deleteUser(userId).then(() => {
      this.getUsersForDisplay();
    });
  }

  editUser(selectedUser: IUser) {
    this.setState({ selectedUser, openDialog: true });
  }
}

export default withStyles(styles)(UserManagement);
