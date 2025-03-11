const express = require('express');

const { productServices } = require('../service');
const { productController } = require('../controller');

const productRouter = express.Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);

productRouter.post('/', productController.createProduct);

productRouter.put('/:id', productController.updateProduct);

productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
