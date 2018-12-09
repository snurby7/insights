import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";
import YnabDataUtility from "../../utilities/ynab-data-utility";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function renderTransactions(props) {
  return (
    <li key={props.id}>
      Category {props.category_name} for {YnabDataUtility.format(props.amount)}
    </li>
  );
}

class TransactionsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPayee: {},
      transactions: [],
      open: false,
      onClose: props.onClose
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      selectedPayee: props.selectedPayee,
      transactions: props.transactions,
      open: props.open
    };
  }

  handleClose = () => {
    this.setState({ open: false });
    this.state.onClose();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Viewing Transactions for {this.state.selectedPayee.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Total transaction(s) {this.state.transactions.length}!
            </DialogContentText>
            <ol>{this.state.transactions.map(x => renderTransactions(x))}</ol>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default TransactionsDialog;
