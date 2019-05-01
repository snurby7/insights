import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

import { UserAgent } from '../../../../../agents';
import { IUser } from '../../../../../contracts';
import { IUserDialogProps } from './IUserDialogProps';

export interface IDialogState extends IUser {
  budgetId?: string;
  open: boolean;
  name: string;
  salary: string;
}

class UserDialog extends React.Component<IUserDialogProps, IDialogState> {
  constructor(props: IUserDialogProps) {
    super(props);
    this.state = {
      open: props.open,
      name: props.user ? props.user.name : '',
      salary: props.user ? props.user.salary.toString() : '', // TODO Make this allow decimals
    };
  }

  public handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name as keyof IDialogState;
    const state = this.state as IDialogState;
    state[name] = value;
    if (target.validity.valid) {
      this.setState(state);
    }
  }

  public handleSubmit() {
    (this.props.user ? UserAgent.updateUser(this.formatRequest()) : UserAgent.saveUser(this.formatRequest())).then(
      () => {
        this.handleClose(true);
      }
    );
  }

  public handleClose(refresh?: boolean): void {
    this.setState({
      open: false,
      name: '',
      salary: '',
      _id: undefined,
    });
    this.props.onClose(refresh);
  }

  public formatRequest() {
    const currentState: IDialogState = this.state;
    if (this.props.user) {
      currentState._id = this.props.user._id;
    }
    const { budgetId } = this.props;
    currentState.budgetId = budgetId;
    delete currentState.open;
    return currentState;
  }

  public render() {
    const { open, name, salary } = this.state;
    return (
      <Dialog open={open} keepMounted={true} onClose={() => this.handleClose()}>
        <DialogTitle>User</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter some data about the user to add</DialogContentText>
          <form onSubmit={() => this.handleSubmit()}>
            <label>
              Name:
              <input name="name" value={name} onChange={event => this.handleChange(event)} />
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
          <Button type="submit" onClick={() => this.handleSubmit()} color="primary">
            Save
          </Button>
          <Button type="button" onClick={() => this.handleClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default UserDialog;
