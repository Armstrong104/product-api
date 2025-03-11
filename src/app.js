const express = require('express');

const { configureRouter } = require('./router');
const { logMiddleware, errorHandler } = require('./middleware');
const connectDB = require('./db');
const config = require('./config');

const port = config.PORT;

const app = express();

connectDB();

app.use(express.json());

app.use(logMiddleware);

configureRouter(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
