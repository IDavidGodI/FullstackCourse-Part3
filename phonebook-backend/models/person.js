const mongoose = require("mongoose")

mongoose.set('strictQuery',false)
const uri = process.env.MONGODB_URI;
console.log(uri)
mongoose.connect(uri)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

module.exports = mongoose.model("Person", personSchema);
