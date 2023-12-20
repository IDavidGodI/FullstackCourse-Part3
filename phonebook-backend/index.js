const express = require("express")
const app = express()

app.use(express.json())

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
  persons = persons.find(person => person.id===id)
  if (person)
    res.json(person)
  else
    res.status(404).end()
})

app.post("/api/persons", (req,res)=>{
  const body = req.body;
  body.id = Math.round(Math.random()*10000)
  console.log(body)
  persons = persons.concat(body)
  res.json(body)
})

app.delete("/api/persons/:id", (req,res)=>{
  const id = Number(req.params.id);
  console.log("ID to delete:", id)
  persons = persons.filter(person => person.id!==id)
  res.status(204).end()
})


const PORT = 3001;

app.listen(PORT,()=>{
  console.log("Server listening at port", PORT)
})
