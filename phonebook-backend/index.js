require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const app = express()
const cors = require('cors')
const Person = require("./models/person")

app.use(cors())
app.use(express.json())

app.use(morgan("dev"))

app.use(express.static('dist'))

app.get("/api/persons", (req, res)=>{
  Person.find({}).then(persons=>res.json(persons))
})

app.get("/info", (req,res)=>{
  res.send(
    `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `
  )
})

app.get("/api/persons/:id", (req,res)=>{
  Person.findById(req.params.id)
  .then(person=>{
    console.log(person)
    if (person)
      res.json(person)
    else
      res.status(404).end()
  })
  .catch(error=>{
    console.log(error)
    res.status(500).end()
  })
})


app.post("/api/persons", (req,res)=>{
  const body = req.body;
  console.log(body)
  if (!body.name || !body.number){
    return res.status(400).json({
      error: "Missing name or number."
    })
  }

  body.name = body.name.trim()

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(result=> res.json(result))
  
})

app.delete("/api/persons/:id", (req,res)=>{
  Person.findByIdAndDelete(req.params.id)
    .then(result =>{
      res.status(204).end()
    })
    .catch(error=>{
      console.log(error)
    })
})


const PORT = process.env.PORT;

app.listen(PORT,()=>{
  console.log("Server listening at port", PORT)
})
