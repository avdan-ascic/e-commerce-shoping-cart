import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  customerUsername: {
    type: String,
    required: "Customer's username is required!",
  },
  discountCode: {
    type: String,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  ],
});

export default mongoose.model("order", orderSchema);
