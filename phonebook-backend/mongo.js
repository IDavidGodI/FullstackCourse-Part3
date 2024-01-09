const mongoose = require("mongoose")

if (process.argv.length<3){
  console.log("missing arguments, please put the pawssword")
  process.exit(1)
}

const password = process.argv[2];

const uri = `mongodb+srv://CrlsDev:${password}@cluster0.hfxufys.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(uri)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("prueba", personSchema);

if (process.argv.length<5){
  Person
  .find({})
  .then(persons=> {
    console.log(
      "phonebook:\n",
      ...persons.map(person=>`${person.name} ${person.number}\n`)
    )
    mongoose.connection.close()
    process.exit(0)
  })

}else{
  
  const name = process.argv[3];
  const number = process.argv[4];
  
  const person = new Person({name, number})
  
  person.save().then(result =>{
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })

}