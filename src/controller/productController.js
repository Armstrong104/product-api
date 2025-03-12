const asyncHandler = require('express-async-handler');
const { productServices } = require('../service');
const { ProductSchema } = require('../schema/product');

const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await productServices.createProduct(req.body);
  res.status(201).json({
    message: 'Product created successfully',
    product: newProduct,
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productServices.getAllProducts();
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
  res.status(201).json({
    message: 'Product deleted successfully',
    product: deletedProduct,
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
