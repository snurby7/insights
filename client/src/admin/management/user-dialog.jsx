import React from "react";
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
    // TODO Note this is just an add, edit will need to account for an ID
    this.state = {
      user: "",
      salary: "" // TODO Make this allow decimals
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

  async handleSubmit(event) {
    // TODO add the budgetId to the users
    await UserAgent.saveUser(this.formatAddRequest());
    event.preventDefault();
    this.props.onClose(this.state);
  }

  handleClose() {
    this.setState({ open: false });
    this.props.onClose(null);
  }

  formatAddRequest() {
    const currentState = this.state;
    delete currentState.open;
    return currentState;
  }

  static getDerivedStateFromProps(props, state) {
    return {
      open: props.open
    };
  }

  render() {
    return (
      <Dialog
        open={this.state.open}
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
                name="user"
                value={this.state.user}
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
                value={this.state.salary}
                onChange={event => this.handleChange(event)}
              />
            </label>
            <br />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={event => this.handleSubmit(event)} color="primary">
            Save
          </Button>
          <Button onClick={() => this.handleClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default UserDialog;
