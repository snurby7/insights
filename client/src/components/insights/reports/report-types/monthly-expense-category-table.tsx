import Paper from '@material-ui/core/Paper';
import { Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { OverflowAnchorProperty } from 'csstype';
import React from 'react';

<<<<<<< HEAD:client/src/components/insights/reports/report-types/monthly-expense-category-table.tsx
import { YnabDataUtility } from '../../../../utilities';
=======
import { FormatUtility } from '../../../../utilities';
>>>>>>> categories-building-36:client/src/components/insights/reports/report-types/monthly-expense-category-table.tsx

export interface IMonthlyExpenseCategoryTableProps {
  classes: any;
  month: string;
  monthData: any; // TODO type this
}

const overflowX: OverflowAnchorProperty = 'auto';

const styles = (theme: Theme) => ({
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

class MonthlyExpenseCategoryTable extends React.Component<IMonthlyExpenseCategoryTableProps> {
  public render() {
    const { classes, month, monthData } = this.props;
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
                    <TableCell component="th">{FormatUtility.toUSD(monthData[categoryId].outflow)}</TableCell>
                    <TableCell component="th">{FormatUtility.toUSD(monthData[categoryId].inflow)}</TableCell>
                    <TableCell component="th">{monthData[categoryId].transactions.length}</TableCell>
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

export default withStyles(styles)(MonthlyExpenseCategoryTable);
