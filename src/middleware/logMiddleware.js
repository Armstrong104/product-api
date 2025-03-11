const logMiddleware = (req, res, next) => {
  console.log(`Method: ${req.method} - Path: ${req.originalUrl}`);
  next();
};

module.exports = logMiddleware;
