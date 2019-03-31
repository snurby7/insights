import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import React from 'react';

import { ITransaction } from '../../../../contracts';
import { YnabDataUtility } from '../../../../utilities';

export interface ITransactionsDialogProps {
  payeeName: string;
  open: boolean;
  onClose: () => void;
  transactions: ITransaction[];
}

function Transition(props: any) {
  return <Slide direction="up" {...props} />;
}

function renderTransactions(transaction: ITransaction) {
  return (
    <li key={transaction.id}>
      <div>Account - {transaction.account_name}</div>
      <div>Date - {transaction.date}</div>
      <div>Category - {transaction.category_name}</div>
      <div>Amount - ({YnabDataUtility.format(transaction.amount)})</div>
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
