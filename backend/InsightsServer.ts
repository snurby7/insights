import { Server } from '@overnightjs/core';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import AccountController from './controllers/AccountController';
import AccountDetailController from './controllers/AccountDetailController';
import BudgetController from './controllers/BudgetController';
import BudgetUserProfileController from './controllers/BudgetUserProfileController';
import CategoryController from './controllers/CategoryController';
import PayeeController from './controllers/PayeeController';
import ReportController from './controllers/ReportController';
import SyncController from './controllers/SyncController';
import TransactionController from './controllers/TransactionController';

class InsightsServer extends Server {

    private readonly _SERVER_START_MSG = 'Insights server started on port: ';
    private readonly _DEV_MSG = 'Express Server currently running on port: ';

    private _port = 5000;

    constructor() {
        super();

        // Setup json middleware
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        // Setup the controllers
        this.setUpMongo();
    }

    private setUpMongo() {
        // this is our MongoDB database
        const dbRoute = 'mongodb://localhost:27017/ynab';
        mongoose.connect(
        dbRoute,
        { useNewUrlParser: true }
        );

        const db = mongoose.connection;
        db.once('open', () => {
            console.log('Connected to Mongo, initializing Controllers');
            this._setupControllers(db);
        });
        db.on('error', () => console.error('MongoDB connection error:'));
    }


    private _setupControllers(db: mongoose.Connection): void {
        const controllers: any[] = [
            new AccountController(db),
            new AccountDetailController(db),
            new BudgetController(db),
            new BudgetUserProfileController(db),
            new CategoryController(db),
            new PayeeController(db),
            new ReportController(db),
            new SyncController(db),
            new TransactionController(db),
        ];
        super.addControllers(controllers);
    }


    public start(): void {
        this.app.listen(this._port, () => {
            console.log(this._SERVER_START_MSG + this._port);
        });
    }
}


/**
 * Start the server
 */
(() => {
    const server = new InsightsServer();
    server.start();
})();