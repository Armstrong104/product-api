const express = require('express');
const path = require('path');

const { ProductSchema, CreateProductPayload } = require('../schema');
const { productController } = require('../controller');
const { validatePayload, upload } = require('../middleware');
const config = require('../config');
const logger = require('../config/logger');

const productRouter = express.Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductById);

productRouter.use(
  '/images',
  express.static(path.join(__dirname, `../../${config.FILE_SERVER.UPLOAD_DIR}`))
);

productRouter.post(
  '/',
  upload.single('imageFile'),
  (req, res, next) => {
    if (req.file) {
      logger.info(`Request has file ${req.file}`);
      req.body.image = `api/products/images/${req.file.filename}`;
    }
    next();
  },
  validatePayload(CreateProductPayload),
  productController.createProduct
);

productRouter.put(
  '/:id',
  validatePayload(ProductSchema.partial()),
  productController.updateProduct
);

productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
