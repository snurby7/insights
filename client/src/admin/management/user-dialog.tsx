import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import React from 'react';

import UserAgent from '../../agents/user-agent';
import { IUser } from '../../contracts/user.interface';
import { IUserDialogProps } from './IUserDialogProps';

export interface IDialogState extends IUser {
  budgetId?: string;
  open: boolean;
}

function Transition(props: void) {
  return <Slide direction="up" {...props} />;
}

class UserDialog extends React.Component<IUserDialogProps, IDialogState> {
  constructor(props: IUserDialogProps) {
    super(props);
    this.state = {
      open: props.open,
      name: props.user ? props.user.name : "",
      salary: props.user ? props.user.salary : "" // TODO Make this allow decimals
    };
  }

  // TODO try and put a type on this
  handleChange(event: any) {
    const target = event.target;
    let name = target.name;
    const value = target.value;
    if (target.validity.valid) {
      this.setState({ [name]: value } as Pick<IDialogState, keyof IDialogState>);
    }
  }

  handleSubmit() {
    (this.props.user
      ? UserAgent.updateUser(this.formatRequest())
      : UserAgent.saveUser(this.formatRequest())
    ).then(() => {
      this.handleClose(true);
    });
  }

  handleClose(refresh?: boolean): void {
    this.setState({
      open: false,
      name: "",
      salary: "",
      _id: undefined
    });
    this.props.onClose(refresh);
  }

  formatRequest() {
    const currentState: IDialogState = this.state;
    if (this.props.user) {
      currentState._id = this.props.user._id;
    }
    const { budgetId } = this.props;
    currentState.budgetId = budgetId;
    delete currentState.open;
    return currentState;
  }

  render() {
    const { open, name, salary } = this.state;
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => this.handleClose()}
      >
        <DialogTitle>User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter some data about the user to add
          </DialogContentText>
          <form onSubmit={() => this.handleSubmit()}>
            <label>
              Name:
              <input
                name="name"
                value={name}
                onChange={event => this.handleChange(event)}
              />
            </label>
            <br />
            <label>
              Salary:
              {/* TODO allow for decimals in the salary with a mask */}
              <input
                name="salary"
                type="text"
                pattern="[0-9]*"
                value={salary}
                onChange={event => this.handleChange(event)}
              />
            </label>
            <br />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            onClick={() => this.handleSubmit()}
            color="primary"
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={() => this.handleClose()}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default UserDialog;