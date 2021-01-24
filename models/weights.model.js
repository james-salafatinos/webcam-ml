const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let weightsSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    model_weights: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Weights = mongoose.model("Weights", weightsSchema);
module.exports = Weights
