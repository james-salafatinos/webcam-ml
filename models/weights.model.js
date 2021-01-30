const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let weightsSchema = new Schema(
  {
    model_weights: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Weights = mongoose.model("Weights", weightsSchema);
module.exports = Weights;
