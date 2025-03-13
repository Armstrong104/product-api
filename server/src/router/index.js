const productRouter = require('./productRouter');

const configureRouter = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api/products', productRouter);
};

module.exports = {
  configureRouter,
};
