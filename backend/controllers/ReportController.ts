import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { Connection } from 'mongoose';
import { SubTransaction, TransactionDetail } from 'ynab';

interface IResult {
  categoryName: string;
  outflow: number;
  inflow: number;
  transactions: (TransactionDetail | SubTransaction)[];
}

@Controller('api/reports')
class ReportController {
  private _db: Connection;

  constructor(db: Connection) {
    this._db = db;
  }

  @Get('monthly')
  private async getMonthlyReports(req: Request, res: Response): Promise<void> {
    const { startingMonth, startingYear, budgetId } = req.query;
    const startDate = moment([startingYear, startingMonth, 1]);
    const endDate = moment();
    const results: { [month: string]: TransactionDetail[] } = {};

    endDate.subtract(1, 'month'); //Substract one month to exclude extra end
    const month = moment(startDate); //clone the startDate
    while (month < endDate) {
      month.add(1, 'month');
      results[month.format('YYYY-MM-DD')] = await this._db
        .collection('transactions')
        .find({
          date_month: month.month(),
          date_year: month.year(),
          budgetId,
        })
        .sort({ category_name: 1 })
        .toArray();
    }
    res.send(this.processResultsByMonth(results));
  }

  private processResultsByMonth(results: { [month: string]: TransactionDetail[] }) {
    const formattedResults: { [month: string]: any } = {};
    Object.keys(results).forEach(key => {
      formattedResults[key] = {};
      results[key].forEach(transaction => {
        if (transaction.category_id) {
          if (transaction.subtransactions && transaction.subtransactions.length > 0) {
            transaction.subtransactions.forEach(sub =>
              this.processTransaction(formattedResults, key, sub)
            );
          } else {
            this.processTransaction(formattedResults, key, transaction);
          }
          if (
            transaction.category_name &&
            formattedResults[key] &&
            formattedResults[key][transaction.category_id]
          ) {
            formattedResults[key][transaction.category_id].categoryName = transaction.category_name;
          }
        }
      });
    });
    return formattedResults;
  }

  private processTransaction(
    results: { [month: string]: { [categoryId: string]: IResult } },
    monthKey: string,
    transaction: TransactionDetail | SubTransaction
  ) {
    if (!results[monthKey][transaction.category_id]) {
      results[monthKey][transaction.category_id] = {
        categoryName: Object.keys(transaction).some(x => x === 'category_name')
          ? (<TransactionDetail>transaction).category_name
          : 'Auto Budgeted',
        outflow: transaction.amount < 0 ? transaction.amount : 0,
        inflow: transaction.amount > 0 ? transaction.amount : 0,
        transactions: [transaction],
      };
      return;
    }
    const keyObj = results[monthKey][transaction.category_id];
    if (transaction.amount < 0) {
      keyObj.outflow += transaction.amount;
    }
    if (transaction.amount > 0) {
      keyObj.inflow += transaction.amount;
    }
    keyObj.transactions.push(transaction);
    results[monthKey][transaction.category_id] = keyObj;
  }
}

export default ReportController;
