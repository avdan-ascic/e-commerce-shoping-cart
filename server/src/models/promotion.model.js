import mongoose from "mongoose";

const promotionSchema = mongoose.Schema({
  code: {
    type: String,
    required: "Promotion code is required!",
  },
  discount: {
    type: Number,
    required: "Discount is required!",
  },
  expirationDate: {
    type: Date,
    required: "Expiration date is required!",
  },
});

promotionSchema.pre("save", async function (next) {
  const promotionModel = mongoose.model("promotion", promotionSchema);

  const checkPromotion = await promotionModel.findOne({ code: this.code });
  if (checkPromotion)
    return next(new Error("Promotion code is already in use!"));

  next();
});

export default mongoose.model("promotion", promotionSchema);
