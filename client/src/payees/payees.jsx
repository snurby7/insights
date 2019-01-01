import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TransactionsDialog from "../transactions/transactions-dialog";
import YnabAgent from "../agents/ynab-agent";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    maxHeight: 400,
    maxWidth: 700
  },
  table: {
    maxHeight: 400,
    maxWidth: 700
  }
});

class Payees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,
      masterPayees: [],
      open: false,
      payees: [],
      selectedPayee: {},
      transactions: [],
      value: ""
    };
  }

  handleInputChange(event) {
    const inputValue = event.target.value;
    if (inputValue === "") {
      this.setState({ payees: this.state.masterPayees });
    } else {
      this.setState({
        payees: this.state.masterPayees.filter(x =>
          x.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      });
    }
    this.setState({ value: event.target.value });
  }

  handleClickOpen(selectedPayee) {
    this.setState({ selectedPayee });
    this.getTransactionsByPayeeOnClick(selectedPayee.id);
  }

  async getTransactionsByPayeeOnClick(payeeId) {
    const transactions = await YnabAgent.getTransactionsByPayee(payeeId);
    this.setState({ open: true, transactions });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h2>Payees ({this.state.payees.length})</h2>
          <Paper className={this.state.classes.root}>
            <Table className={this.state.classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Transactions</TableCell>
                  <TableCell>Payee Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.payees.map(payee => {
                  return (
                    <TableRow key={payee.id}>
                      <TableCell component="th" scope="payee">
                        <Button
                          onClick={() => this.handleClickOpen(payee)}
                          variant="outlined"
                        >
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
            payeeName={this.state.selectedPayee.name}
            transactions={this.state.transactions}
            open={this.state.open}
          />
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getPayees();
  }

  async getPayees() {
    const budgetId = this.props.budgetId;
    const payees = await YnabAgent.getPayeesByBudgetId(budgetId);
    this.setState({ payees: payees, masterPayees: payees });
  }
}

Payees.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Payees);
