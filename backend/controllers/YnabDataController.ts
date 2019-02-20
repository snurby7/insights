import { Controller } from '@overnightjs/core';
import { Connection } from 'mongoose';

@Controller('api/user')
class YnabDataController {
  private _db: Connection;

  constructor(db: Connection) {
    this._db = db;
  }

}

export default YnabDataController;
