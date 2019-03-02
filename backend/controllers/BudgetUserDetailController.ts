import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Connection } from 'mongoose';

@Controller('api/users')
class BudgetUserDetailController {
  private _db: Connection;

  constructor(db: Connection) {
    this._db = db;
  }

  @Get(':budgetId')
  public async getUsers(req: Request, res: Response): Promise<void> {
    const budgetId = req.params.budgetId;
    const users = await this._db
      .collection('users')
      .find({
        budgetId,
      })
      .toArray();
    res.send(users);
  }
}

export default BudgetUserDetailController;
