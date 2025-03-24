const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');

const { configureRouter } = require('./router');
const { errorHandler } = require('./middleware');
const connectDB = require('./db');
const config = require('./config');
const limiter = require('./config/ratelimit');
const logger = require('./config/logger');

const port = config.PORT;

const app = express();

app.use(pinoHttp({ logger }));

app.use(cors(config.CORS));

connectDB();

app.use(express.json());

app.use(limiter);

configureRouter(app);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
