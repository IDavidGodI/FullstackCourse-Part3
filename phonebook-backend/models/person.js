const mongoose = require("mongoose")

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URI)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

module.exports = mongoose.model("Person", personSchema);
