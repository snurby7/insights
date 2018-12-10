import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TransactionsDialog from "./transactions/transactions-dialog";
import ApiUtility from "../utilities/api-utility";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  buttonMarginLeft: {
    marginLeft: theme.spacing.unit * 2
  },
  listMargin: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function renderPayee(props) {
  return (
    !props.payee.deleted && (
      <li className={props.classes.listMargin} key={props.payee.id}>
        {props.payee.name}
        <Button
          className={props.classes.buttonMarginLeft}
          onClick={() => props.onClick(props.payee)}
          variant="outlined"
        >
          Transactions
        </Button>
      </li>
    )
  );
}

// TODO turn this into a table.

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
    ApiUtility.getRequest(
      "/api/transactions/payee",
      {
        payeeId: selectedPayee.id
      },
      transactions => this.setState({ open: true, transactions })
    );
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h2>Payees ({this.state.payees.length})</h2>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={event => this.handleInputChange(event)}
          />
        </label>
        <ol>
          {this.state.payees.map(x =>
            renderPayee({
              payee: x,
              onClick: payee => this.handleClickOpen(payee),
              classes: this.state.classes
            })
          )}
        </ol>
        <TransactionsDialog
          onClose={() => this.setState({ open: false })}
          selectedPayee={this.state.selectedPayee}
          transactions={this.state.transactions}
          open={this.state.open}
        />
      </div>
    );
  }

  componentDidMount() {
    this.getPayees(`/api/payees`, this.props.budgetId);
  }

  async getPayees(route, budgetId) {
    ApiUtility.getRequest(
      route,
      {
        budgetId
      },
      payees => this.setState({ payees: payees, masterPayees: payees })
    );
  }
}

Payees.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Payees);
