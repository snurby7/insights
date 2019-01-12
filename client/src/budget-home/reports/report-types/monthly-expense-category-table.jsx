import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';

import YnabDataUtility from '../../../utilities/ynab-data-utility';

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

class MonthlyExpenseCategoryTable extends React.Component {
  render() {
    const {classes, month, monthData} = this.props;
    return (
      <React.Fragment>
        <h2>{month}</h2>
        <Paper className={classes.root}>
            <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Outflow</TableCell>
                <TableCell>Inflow</TableCell>
                <TableCell>Transactions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(monthData).map(categoryId => {
                return (
                  <TableRow key={categoryId}>
                    <TableCell component="th" scope="payee">
                      {monthData[categoryId].categoryName}
                    </TableCell>
                    <TableCell component="th">
                      {YnabDataUtility.format(monthData[categoryId].outflow)}
                    </TableCell>
                    <TableCell component="th">
                      {YnabDataUtility.format(monthData[categoryId].inflow)}
                    </TableCell>
                    <TableCell component="th">
                      {monthData[categoryId].transactions.length}
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

MonthlyExpenseCategoryTable.propTypes = {
  monthData: PropTypes.object.isRequired,
  month: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MonthlyExpenseCategoryTable);
