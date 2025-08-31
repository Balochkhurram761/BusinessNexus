import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },
    oldprice: {
      type: Number,
      default: null,
    },
    minNegotiablePrice: {
      type: Number,
      required: true,
    },
    maxNegotiablePrice: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      default: null,
    },
    design: {
      type: String,
      default: null,
    },
    customization: {
      type: String,
      default: null,
    },
    protection: {
      type: String,
      default: null,
    },
    warranty: {
      type: String,
      default: null,
    },
    stock: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      default: [],
      required: true,
    },
    size: {
      type: [String],
      enum: ["small", "medium", "large", "XL", "XXL"],
      default: [],
    },
    color: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    recommended: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    sold: {
      type: Number,
      default: 0,
    },
    review: {
      type: Number,
      default: 0,
    },
    off: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

const ProductUser = mongoose.model("product", productSchema);

export default ProductUser;
