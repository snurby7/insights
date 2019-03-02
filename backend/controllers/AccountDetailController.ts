import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Connection } from 'mongoose';

@Controller('api/account')
class AccountDetailController {
  private _db: Connection;

  constructor(db: Connection) {
    this._db = db;
  }

  @Get(':accountId')
  public async getAccounts(req: Request, res: Response): Promise<void> {
    const {accountId: account_id} = req.params;
    const transactions = await this._db.collection('transactions').find({
      account_id
    }).toArray();
    res.send(transactions);
  }
}

export default AccountDetailController;
