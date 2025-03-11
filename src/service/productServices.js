const NotFoundError = require('../errors');
const { Product } = require('../model');

const products = [
  {
    _id: 'dfce5a2b-3ead-4ddd-9498-7557c6a828b0',
    name: 'baked beans',
    price: 0.4,
    image: 'beans.jpg',
    type: 'vegetables',
  },
  {
    _id: 'b5429287-8149-4a27-974d-c56a9a274a23',
    name: 'hot dogs',
    price: 1.99,
    image: 'hotdogs.jpg',
    type: 'meat',
  },
];

const createProduct = async (productPayload) => {
  const newProduct = new Product(productPayload);
  await newProduct.save();
  return newProduct;
};

const getAllProducts = async () => {
  const products = await Product.find({ deleted: false }).select(
    '_id name price image'
  );
  return products;
};

const getProductById = async (id) => {
  return await Product.findOne({ _id: id, deleted: false });
};

const updateProduct = async (id, payload) => {
  return await Product.findByIdAndUpdate({ _id: id }, payload);
};

const deleteProduct = async (id) => {
  return await Product.findOneAndUpdate(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
