import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Connection } from 'mongoose';

@Controller('api/categories')
class CategoryController {
  private _db: Connection;

  constructor(db: Connection) {
    this._db = db;
  }

  @Get(':budgetId')
  public async getCategoriesForBudget(req: Request, res: Response): Promise<void> {
    const categories = await this._db
      .collection('categories')
      .find({
        budgetId: req.params.budgetId,
        hidden: false
      })
      .sort({ name: 1 })
      .toArray();
    res.send(categories);
  }
}

export default CategoryController;
