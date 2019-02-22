"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@overnightjs/core");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var AccountController_1 = require("./controllers/AccountController");
var BudgetController_1 = require("./controllers/BudgetController");
var BudgetUserProfileController_1 = require("./controllers/BudgetUserProfileController");
var CategoryController_1 = require("./controllers/CategoryController");
var PayeeController_1 = require("./controllers/PayeeController");
var ReportController_1 = require("./controllers/ReportController");
var SyncController_1 = require("./controllers/SyncController");
var TransactionController_1 = require("./controllers/TransactionController");
var InsightsServer = (function (_super) {
    tslib_1.__extends(InsightsServer, _super);
    function InsightsServer() {
        var _this = _super.call(this) || this;
        _this._SERVER_START_MSG = 'Insights server started on port: ';
        _this._DEV_MSG = 'Express Server currently running on port: ';
        _this._port = 5000;
        _this.app.use(bodyParser.json());
        _this.app.use(bodyParser.urlencoded({ extended: true }));
        _this.setUpMongo();
        return _this;
    }
    InsightsServer.prototype.setUpMongo = function () {
        var _this = this;
        var dbRoute = 'mongodb://localhost:27017/ynab';
        mongoose.connect(dbRoute, { useNewUrlParser: true });
        var db = mongoose.connection;
        db.once('open', function () {
            console.log('Connected to Mongo, initializing Controllers');
            _this._setupControllers(db);
        });
        db.on('error', function () { return console.error('MongoDB connection error:'); });
    };
    InsightsServer.prototype._setupControllers = function (db) {
        var controllers = [
            new AccountController_1.default(db),
            new BudgetController_1.default(db),
            new BudgetUserProfileController_1.default(db),
            new CategoryController_1.default(db),
            new PayeeController_1.default(db),
            new ReportController_1.default(db),
            new SyncController_1.default(db),
            new TransactionController_1.default(db),
        ];
        _super.prototype.addControllers.call(this, controllers);
    };
    InsightsServer.prototype.start = function () {
        var _this = this;
        this.app.listen(this._port, function () {
            console.log(_this._SERVER_START_MSG + _this._port);
        });
    };
    return InsightsServer;
}(core_1.Server));
(function () {
    var server = new InsightsServer();
    server.start();
})();
//# sourceMappingURL=InsightsServer.js.map