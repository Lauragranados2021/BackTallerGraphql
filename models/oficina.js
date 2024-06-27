const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaOficina = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
 name:{
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  capacidad: {
    type: Number,
    required: true,
  },
  alquiler: [{
    type: Schema.Types.ObjectId,
      ref: "alquiler",
},
],
});

module.exports = mongoose.model("oficina", SchemaOficina);