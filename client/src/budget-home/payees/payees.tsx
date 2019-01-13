import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { OverflowAnchorProperty } from 'csstype';
import React from 'react';

import YnabAgent from '../../agents/ynab-agent';
import TransactionsDialog from '../transactions/transactions-dialog';

export interface IPayeeProps {
  classes: any;
  budgetId: string;
}

export interface IPayeeState {
  masterPayees: any[]; // TODO IPayees[]
  open: boolean;
  payees: any[]; // TODO IPayee[]
  selectedPayee: any; // TODO IPayee
  transactions: any[]; // TODO ITransactions[]
  value: string;
}

const overflowX: OverflowAnchorProperty = 'auto';

const styles = (theme: any) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX,
    maxHeight: 400,
    maxWidth: 700,
  },
  table: {
    maxHeight: 400,
    maxWidth: 700,
  },
});

class Payees extends React.Component<IPayeeProps, IPayeeState> {
  // TODO clean all of these up
  public state = {
    masterPayees: [] as any[],
    open: false,
    payees: [] as any[],
    selectedPayee: {} as any,
    transactions: [] as any[],
    value: '',
  };

  // TODO type this as an event of some sort
  public handleInputChange(event: any) {
    const inputValue = event.target.value;
    if (inputValue === '') {
      this.setState({ payees: this.state.masterPayees });
    } else {
      this.setState({
        payees: this.state.masterPayees.filter(x => x.name.toLowerCase().includes(inputValue.toLowerCase())),
      });
    }
    this.setState({ value: event.target.value });
  }

  public handleClickOpen(selectedPayee: any /* TODO IPayee */) {
    this.setState({ selectedPayee });
    this.getTransactionsByPayeeOnClick(selectedPayee.id);
  }

  public getTransactionsByPayeeOnClick(payeeId: string) {
    // TODO network request locks it up a little bit, need to improve thata
    YnabAgent.getTransactionsByPayee(payeeId).then(transactions => {
      this.setState({ open: true, transactions });
    });
  }

  public handleClose = () => {
    this.setState({ open: false });
  };

  public render() {
    const { classes } = this.props;
    const { payees, selectedPayee, transactions, open } = this.state;
    return (
      <React.Fragment>
        <div>
          <h2>Payees ({payees.length})</h2>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Transactions</TableCell>
                  <TableCell>Payee Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payees.map(payee => {
                  return (
                    <TableRow key={payee.id}>
                      <TableCell component="th" scope="payee">
                        <Button onClick={() => this.handleClickOpen(payee)} variant="outlined">
                          View
                        </Button>
                      </TableCell>
                      <TableCell component="th" scope="payee">
                        {payee.name}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <TransactionsDialog
            onClose={() => this.setState({ open: false })}
            payeeName={selectedPayee.name}
            transactions={transactions}
            open={open}
          />
        </div>
      </React.Fragment>
    );
  }

  public componentDidMount() {
    const { budgetId } = this.props;
    YnabAgent.getPayeesByBudgetId(budgetId).then(payees => {
      this.setState({
        payees,
        masterPayees: payees,
      });
    });
  }
}

export default withStyles(styles)(Payees);
