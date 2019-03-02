import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Connection } from 'mongoose';

import { aggregateTransactionsByDay } from '../processing/ynab-data-processing';

@Controller('api/transactions')
class TransactionController {
  private _db: Connection;

  constructor(db: Connection) {
    this._db = db;
  }

  @Get('all')
  public async getAllTransactions(req: Request, res: Response): Promise<void> {
    // TODO Add the budgetId onto this so it's not just pulling everything.
    const transactions = await this._db
      .collection('transactions')
      .find({})
      .sort({ name: 1 })
      .toArray();
    res.send(transactions);
  }

  @Get(':payeeId')
  public async getTransactionsByPayee(req: Request, res: Response): Promise<void> {
    // TODO Add the budgetId onto this so it's not just pulling everything.
    const {payeeId: payee_id} = req.params;
    const transactions = await this._db
      .collection('transactions')
      .find({
        payee_id
      })
      .sort({ name: 1 })
      .toArray();
    res.send(transactions);
  }

  @Get(':budgetId/aggregate')
  public async aggregateAllTransactions(req: Request, res: Response): Promise<void> {
    const {budgetId} = req.params;
    const results = await this._db
      .collection('transactions')
      .find({
        budgetId
      })
      .toArray();
    res.send(aggregateTransactionsByDay(results));
  }
}

export default TransactionController;
