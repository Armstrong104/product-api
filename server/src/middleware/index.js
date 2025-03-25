const errorHandler = require('./errorHandler');
const upload = require('./upload');
const validatePayload = require('./validationMiddleware');

module.exports = {
  upload,
  errorHandler,
  validatePayload,
};
