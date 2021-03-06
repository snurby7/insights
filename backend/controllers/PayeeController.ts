import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Connection } from 'mongoose';

@Controller('api/payees')
class PayeeController {
  private _db: Connection;

  constructor(db: Connection) {
    this._db = db;
  }

  @Get(':budgetId')
  public async getPayeesForBudget(req: Request, res: Response): Promise<void> {
    const {budgetId} = req.params;
    const payees = await this._db
      .collection('payees')
      .find({
        budgetId,
      })
      .sort({ name: 1 })
      .toArray();
    res.send(payees);
  }
}

export default PayeeController;
