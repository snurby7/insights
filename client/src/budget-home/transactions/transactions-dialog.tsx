import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import React from 'react';

import { YnabDataUtility } from '../../utilities/ynab-data-utility';

export interface ITransactionsDialogProps {
  payeeName: string;
  open: boolean;
  onClose: () => void;
  transactions: any[]; // TODO ITransactions[]?
}

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

// TODO type this as an ITransactions
function renderTransactions(props: any) {
  return (
    <li key={props.id}>
      <div>Account - {props.account_name}</div>
      <div>Date - {props.date}</div>
      <div>Category - {props.category_name}</div>
      <div>Amount - ({YnabDataUtility.format(props.amount)})</div>
    </li>
  );
}

class TransactionsDialog extends React.Component<ITransactionsDialogProps, ITransactionsDialogProps> {
  public static getDerivedStateFromProps(props: ITransactionsDialogProps) {
    return {
      payeeName: props.payeeName,
      transactions: props.transactions,
      open: props.open,
    };
  }
  constructor(props: ITransactionsDialogProps) {
    super(props);
    this.state = {
      ...props,
    };
  }

  public handleClose = () => {
    this.props.onClose();
  };

  public render() {
    const { open, payeeName, transactions } = this.props;

    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted={true}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Viewing Transactions for {payeeName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Total transaction(s) - {transactions.length}!
          </DialogContentText>
          <ol>{transactions.map(x => renderTransactions(x))}</ol>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TransactionsDialog;
