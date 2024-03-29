const mongoose = require("mongoose")

mongoose.set('strictQuery',false)
const uri = process.env.MONGODB_URI;
console.log(uri)
mongoose.connect(uri)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v)=>{
        return /^(\d{2}|\d{3})-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number.`
    },
    required: [true, "User phone is required"]
  }
});

personSchema.set("toJSON", {
  transform: (document, returnedObject)=>{
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema);
