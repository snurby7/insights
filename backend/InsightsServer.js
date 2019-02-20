"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@overnightjs/core");
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var InsightsServer = (function (_super) {
    tslib_1.__extends(InsightsServer, _super);
    function InsightsServer() {
        var _this = _super.call(this) || this;
        _this._SERVER_START_MSG = 'Insights server started on port: ';
        _this._DEV_MSG = 'Express Server currently running on port: ';
        _this._port = 5000;
        _this.app.use(bodyParser.json());
        _this.app.use(bodyParser.urlencoded({ extended: true }));
        if (process.env.NODE_ENV === 'development') {
            _this._serveFrontEndDev();
        }
        else if (process.env.NODE_ENV === 'production') {
            _this._serveFrontEndProd();
        }
        return _this;
    }
    InsightsServer.prototype._setupControllers = function (db) {
        var controllers = [];
        _super.prototype.addControllers.call(this, controllers);
    };
    InsightsServer.prototype._serveFrontEndDev = function () {
        console.info('Starting server in development mode');
        var msg = this._DEV_MSG + process.env.EXPRESS_PORT;
        this.app.get('*', function (req, res) { return res.send(msg); });
    };
    InsightsServer.prototype._serveFrontEndProd = function () {
        console.info('Starting server in production mode');
        this._port = 3002;
        var dir = path.join(__dirname, 'public/react/demo-react/');
        this.app.set('views', dir);
        this.app.use(express.static(dir));
        this.app.get('*', function (req, res) {
            res.sendFile('index.html', { root: dir });
        });
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