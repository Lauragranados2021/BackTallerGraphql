const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaAlquiler = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  ContractStartDate: {
    type: Date,
    required: true,
  },
  ContractEndDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oficinaID: {
    type: Schema.Types.ObjectId,
    ref: "oficina",
  },
});

module.exports = mongoose.model("alquiler", SchemaAlquiler);