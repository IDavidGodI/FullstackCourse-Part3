const express = require("express")
const morgan = require("morgan")
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(morgan())

app.use(express.static('dist'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get("/api/persons", (req, res)=>{
  res.json(persons)
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
  const id = Number(req.params.id);
  const person = persons.find(person => person.id===id)
  if (person)
    res.json(person)
  else
    res.status(404).end()
})

const generateId = () => Math.round(Math.random()*10000);

app.post("/api/persons", (req,res)=>{
  const body = req.body;
  console.log(body)
  if (!body.name || !body.number){
    return res.status(400).json({
      error: "Missing name or number."
    })
  }

  body.name = body.name.trim()

  if (persons.some((person)=>person.name===body.name)){
    return res.status(409).json({
      error: `${body.name} is already in the phonebook`
    })
  }

  const person = 
  {
    name: body.name,
    number: body.number,
    id: generateId()
  } 
  persons = persons.concat(person)
  res.json(person)
})

app.delete("/api/persons/:id", (req,res)=>{
  const id = Number(req.params.id);
  console.log("ID to delete:", id)
  persons = persons.filter(person => person.id!==id)
  res.status(204).end()
})


const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
  console.log("Server listening at port", PORT)
})
