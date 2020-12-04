import express from 'express';
import config from './config/config';
import logging from './config/logging';
import http from 'http';
import sampleRoute from './routes/sample';

const NAMESPACE = 'Server';
const app = express();

app.use((req, res, next) => {
    logging.info(
        NAMESPACE,
        `METHOD - [${req.method}] URL - [${req.url}] IP -  
    [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
        logging.info(
            NAMESPACE,
            `METHOD - [${req.method}] URL - [${req.url}] IP -  
        [${req.socket.remoteAddress}], STATUS: [${res.statusCode}]`
        );
    });

    next();
});

//
app.use(express.json());

// routes
app.use('/sample', sampleRoute);

app.use((req, res, next) => {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELTE POST PUT');
        return res.status(200).json({});
    }
    next();
});

app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
    next();
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () =>
    logging.info(
        NAMESPACE,
        `Server running on $
    {config.server.hostname}:${config.server.port}`
    )
);
