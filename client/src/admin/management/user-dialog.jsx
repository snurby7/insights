import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

import UserAgent from "../../agents/user-agent";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class UserDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      name: props.user ? props.user.name : "",
      salary: props.user ? props.user.salary : "" // TODO Make this allow decimals
    };
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (target.validity.valid) {
      this.setState({ [name]: value });
    }
  }

  async handleSubmit() {
    // TODO add the budgetId to the users
    if (this.props.user) {
      await UserAgent.updateUser(this.formatRequest());
    } else {
      await UserAgent.saveUser(this.formatRequest());
    }
    this.handleClose(true);
  }

  handleClose(refresh) {
    this.setState({
      open: false,
      name: "",
      salary: "",
      _id: null
    });
    this.props.onClose(refresh);
  }

  formatRequest() {
    const currentState = this.state;
    if (this.props.user) {
      currentState._id = this.props.user._id;
    }
    const {budgetId} = this.props;
    currentState.budgetId = budgetId;
    delete currentState.open;
    delete currentState.user;
    return currentState;
  }

  render() {
    const {open, name, salary} = this.state;
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
          <form onSubmit={event => this.handleSubmit(event)}>
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
            type="button"
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

UserDialog.propTypes = {
  user: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
}

export default UserDialog;
