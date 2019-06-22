import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { StyleRules, StyleRulesCallback, Theme, withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';

import { UserAgent } from '../../../../../agents';
import { IUser } from '../../../../../contracts';
import UserDialog from './UserDialog';

const styles: StyleRulesCallback<string> | StyleRules<string> = (
  theme: Theme
) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

export interface IUserManagementProps {
  budgetId: string;
  classes: any;
}

const ListItemWrapper = ({
  user,
  editUser,
  deleteUser,
}: {
  user: IUser;
  editUser: (user: IUser) => void;
  deleteUser: (userId: string | undefined) => void;
}) => {
  const onDeleteClick = () => deleteUser(user._id);
  const onEditClick = () => editUser(user);
  return (
    <>
      <ListItem>
        <ListItemText>{user.name}</ListItemText>
        <IconButton aria-label="Edit" onClick={onEditClick}>
          <Icon>edit_icon</Icon>
        </IconButton>
        <IconButton aria-label="Delete" onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

const UserManagement = ({ classes, budgetId }: IUserManagementProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const getLatestUsers = () => {
    UserAgent.getUsers(budgetId).then(users => setUsers(users));
  };

  useEffect(() => {
    getLatestUsers();
  }, []);

  const addUser = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const onDialogClose = (fireRefresh?: boolean) => {
    setIsDialogOpen(false);
    setSelectedUser(null);
    fireRefresh && getLatestUsers();
  };

  const deleteUser = (userId: string | undefined) => {
    userId &&
      UserAgent.deleteUser(userId).then(() => {
        getLatestUsers();
      });
  };

  const editUser = (userSelected: IUser) => {
    setSelectedUser(userSelected);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className={classes.root}>
        <List component="nav">
          {users.map(user => (
            <ListItemWrapper
              key={user._id}
              editUser={editUser}
              deleteUser={deleteUser}
              user={user}
            />
          ))}
        </List>
        {isDialogOpen && (
          <UserDialog
            budgetId={budgetId}
            open={isDialogOpen}
            user={selectedUser}
            onClose={onDialogClose}
          />
        )}
        <Button onClick={() => addUser()}>Add User</Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(UserManagement);
