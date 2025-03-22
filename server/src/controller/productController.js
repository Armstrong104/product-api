const asyncHandler = require('express-async-handler');
const { productServices } = require('../service');

const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await productServices.createProduct(req.body);
  res.status(201).json({
    message: 'Product created successfully',
    product: newProduct,
  });
});

const getProducts = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { page, limit } = req.query;
  const products = await productServices.getProducts({
    page: parseInt(page || '0'),
    limit: parseInt(limit || '10'),
  });
  res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productServices.getProductById(id);
  res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await productServices.updateProduct(id, req.body);
  res.status(201).json({
    message: 'Product updated successfully',
    product: updatedProduct,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productServices.deleteProduct(id);
  res.status(200).json({
    message: 'Product deleted successfully',
    product: deletedProduct,
  });
});

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
