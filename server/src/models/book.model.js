import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: "Title is required!",
  },
  author: {
    type: String,
    required: "Author is required!",
  },
  price: {
    type: Number,
    get: (v) => parseFloat(v).toFixed(2),
    set: (v) => parseFloat(v).toFixed(2),
    required: "Price is required!",
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  reorderThreshold: {
    type: Number,
    default: 0,
  },
  stopOrder: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("book", bookSchema);
