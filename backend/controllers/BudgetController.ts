import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { Connection } from 'mongoose';

@Controller('api/budget')
class BudgetController {
  private _db: Connection;

  constructor(db: Connection) {
    this._db = db;
  }

  @Get('years')
  public async getBudgetYears(req: Request, res: Response): Promise<void> {
    const response = await this._db
      .collection('budgets')
      .findOne({ id: req.query.budgetId });

    let firstYear = moment(response.first_month).year();
    const finalYear = moment(response.last_month).year();
    const years = [];
    while (firstYear <= finalYear) {
      years.push(firstYear);
      firstYear++;
    }
    res.send(years);
  }

  @Get('')
  public async getBudgets(_: Request, res: Response): Promise<void> {
    const response = await this._db
      .collection('budgets')
      .find()
      .toArray();
    res.send(response);
  }
}

export default BudgetController;
