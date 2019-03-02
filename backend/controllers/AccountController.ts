import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Connection } from 'mongoose';

@Controller('api/accounts')
class AccountController {
  private _db: Connection;

  constructor(db: Connection) {
    this._db = db;
  }

  @Get(':budgetId')
  public async getAccounts(req: Request, res: Response): Promise<void> {
    const accounts = await this._db
      .collection('accounts')
      .find({
        budgetId: req.params.budgetId,
        closed: false,
      })
      .sort({ name: 1 })
      .toArray();
    res.send(accounts);
  }
}

export default AccountController;
