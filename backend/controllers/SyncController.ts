import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Connection } from 'mongoose';

import {
  updateAccounts,
  updateAllPayees,
  updateAllTransactions,
  updateBudgets,
  updateCategories,
} from '../updates/ynab-data-update-methods';

@Controller('api/sync')
class SyncController {
  private _db: Connection;

  constructor(db: Connection) {
    this._db = db;
  }

  @Post('budgets')
  public async updateBudgets(_: Request, res: Response): Promise<void> {
    return await updateBudgets(this._db).then(() => {
      res.send({ success: 'updated all budgets' });
    });
  }

  @Post('payees')
  public async updatePayeesByBudgetId(req: Request, res: Response): Promise<void> {
    return await updateAllPayees(this._db, req.body.budgetId).then(() => {
      res.send({ success: 'updated all payees' });
    });
  }

  @Post('accounts')
  public async updateAccountsByBudgetId(req: Request, res: Response): Promise<void> {
    return await updateAccounts(this._db, req.body.budgetId).then(() => {
      res.send({ success: 'updated all accounts' });
    });
  }

  @Post('transactions')
  public async updateTransactionsByBudgetId(req: Request, res: Response): Promise<void> {
    return await updateAllTransactions(this._db, req.body.budgetId).then(() => {
      res.send({ success: 'updated all transactions' });
    });
  }

  @Post('categories')
  public async updateCategoriesByBudgetId(req: Request, res: Response): Promise<void> {
    return await updateCategories(this._db, req.body.budgetId).then(() => {
      res.send({ success: 'updated all categories' });
    });
  }
}

export default SyncController;