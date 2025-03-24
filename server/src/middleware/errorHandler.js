const { mongoose } = require('mongoose');
const { z } = require('zod');
const NotFoundError = require('../errors');
const logger = require('../config/logger');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    return res.status(400).send(err.errors);
  }
  if (err instanceof NotFoundError) {
    return res.status(404).send(err.message);
  }
  if (
    err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.CastError
  ) {
    return res.status(400).send(err.message);
  }

  logger.error(err.stack);
  res.status(500).send('Internal server error');
};

module.exports = errorHandler;
