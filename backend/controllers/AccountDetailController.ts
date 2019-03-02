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
    res.send({message: 'here you go'});
  }
}

export default AccountDetailController;
