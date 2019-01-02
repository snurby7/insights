import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// TODO needs to be styled and much more compact

class MonthlyExpenseCategoryTable extends React.Component {
  constructor(props) {
    super(props);
    console.log('here');
    this.state = {
      month: props.month
    };
  }
  render() {
    const {month} = this.state;
    return (
      <React.Fragment>
        <h2>PUT THE DATE HERE</h2>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Outflow</TableCell>
                <TableCell>Inflow</TableCell>
                <TableCell>Transactions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(month).map(categoryId => {
                return (
                  <TableRow key={categoryId}>
                    <TableCell component="th" scope="payee">
                      {month[categoryId].categoryName}
                    </TableCell>
                    <TableCell component="th">
                      {month[categoryId].outflow}
                    </TableCell>
                    <TableCell component="th">
                      {month[categoryId].inflow}
                    </TableCell>
                    <TableCell component="th">
                      {month[categoryId].transactions.length}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default MonthlyExpenseCategoryTable;
