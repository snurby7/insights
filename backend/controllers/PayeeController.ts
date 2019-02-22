import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Connection } from 'mongoose';

@Controller('api/payees')
class PayeeController {
  private _db: Connection;

  constructor(db: Connection) {
    this._db = db;
  }

  @Get('')
  public async getPayeesForBudget(_: Request, res: Response): Promise<void> {
    // ! TODO: This needs to use the budgetId
    // https://github.com/snurby7/insights/issues/47
    const payees = await this._db
      .collection('payees')
      .find({})
      .sort({ name: 1 })
      .toArray();
    res.send(payees);
  }
}

export default PayeeController;
