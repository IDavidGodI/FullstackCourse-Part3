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

app.get("/api/persons/:id", (req,res,next)=>{
  Person.findById(req.params.id)
  .then(person=>{
    if (person)
      res.json(person)
    else
      res.status(404).end()
  })
  .catch(error=> next(error))
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

app.put("/api/persons/:id", (req, res, next) =>{
  const body = req.body

  const note = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, note, {new: true})
    .then(result =>{
      res.json(result)
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (req,res, next)=>{
  console.log(req.params)
  Person.findByIdAndDelete(req.params.id)
    .then(result =>{
      console.log(result)
      res.status(204).end()
    })
    .catch(error=> next(error))
})


const errorHandler = (error, req, res, next) =>{
  console.log(error.message)

  if (error.name==="CastError"){
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT;

app.listen(PORT,()=>{
  console.log("Server listening at port", PORT)
})
