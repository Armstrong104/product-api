const express = require('express');

const { ProductSchema } = require('../schema');
const { productController } = require('../controller');
const { validatePayload } = require('../middleware');

const productRouter = express.Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductById);

productRouter.post(
  '/',
  validatePayload(ProductSchema.omit({ _id: true })),
  productController.createProduct
);

productRouter.put(
  '/:id',
  validatePayload(ProductSchema.partial()),
  productController.updateProduct
);

productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
