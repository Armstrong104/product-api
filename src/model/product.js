const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    category: [String],
    metadata: {
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
