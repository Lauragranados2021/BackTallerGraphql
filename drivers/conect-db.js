const mongoose = require("mongoose");

/**Remota*/
const URI = `mongodb+srv://lauragranados05:9jWU1U8UY4koMDSY@cluster0.pfqlkr6.mongodb.net/GraphQl`;

mongoose.set("strictQuery", false);

mongoose
  .connect(URI)
  .then(() => {
    console.log("Conect with database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;