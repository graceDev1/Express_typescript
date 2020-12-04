"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("./config/config"));
var logging_1 = __importDefault(require("./config/logging"));
var http_1 = __importDefault(require("http"));
var sample_1 = __importDefault(require("./routes/sample"));
var NAMESPACE = 'Server';
var app = express_1.default();
app.use(function (req, res, next) {
    logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "] URL - [" + req.url + "] IP -  \n    [" + req.socket.remoteAddress + "]");
    res.on('finish', function () {
        logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "] URL - [" + req.url + "] IP -  \n        [" + req.socket.remoteAddress + "], STATUS: [" + res.statusCode + "]");
    });
    next();
});
//
app.use(express_1.default.json());
// routes
app.use('/sample', sample_1.default);
app.use(function (req, res, next) {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELTE POST PUT');
        return res.status(200).json({});
    }
    next();
});
app.use(function (req, res, next) {
    var error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
    next();
});
var httpServer = http_1.default.createServer(app);
httpServer.listen(config_1.default.server.port, function () {
    return logging_1.default.info(NAMESPACE, "Server running on $\n    {config.server.hostname}:" + config_1.default.server.port);
});
