import {useState} from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import PersonList, {} from "./components/PersonList"
import { useEffect } from 'react'
import personsService from './services/persons'
import Message from "./components/Message"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)


  const handleNewName = (event)=> setNewName(event.target.value);
  const handleNewNumber = (event)=> setNewNumber(event.target.value);
  const handleFilter = (event)=> setFilter(event.target.value);

  useEffect(()=>{
    personsService.getAll("http://localhost:3001/persons")
    .then((res)=>{
      console.log("Data obtained")
      setPersons(res)
    })

  },[])

  const addContact = (event)=>{
    event.preventDefault()
    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()

    if (trimmedName.length===0 || trimmedNumber.length===0){
      alert("Fill the two fields")
      return
    }

    if (persons.some((person)=>person.number===trimmedNumber)){
      alert(`The number ${trimmedNumber} already exists in your contacts`)
      return
    }
    
    const existentPerson = persons.find(p=>p.name===trimmedName)

    if (existentPerson){
      const confirmed = window.confirm(`${existentPerson.name} is already in your contacts, do you want to replace the old number?`)
      if (!confirmed) return;
      const updatedPerdon = {...existentPerson, number: trimmedNumber}

      personsService
      .update(existentPerson.id,updatedPerdon)
      .then(returnedPerson=>{
        setPersons(persons.map(p=> p.id!==existentPerson.id? p : returnedPerson))
        setMessage({text: `${existentPerson.name} number modified`, success:true})
        setTimeout(()=>setMessage(null),5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(e=>{
        setMessage({text: `${existentPerson.name} has been already removed from the server`, success:false})
        setTimeout(()=>setMessage(null),5000)
      })
      return
    }
    
    const newPerson = {name: trimmedName, number: trimmedNumber}
    personsService
    .create(newPerson)
    .then(returnedPerson =>{
      setPersons(persons.concat(returnedPerson))
      setMessage({text: `${trimmedName} added!`, success:true})
      setTimeout(()=>setMessage(null),5000)
      setNewName('')
      setNewNumber('')
    })
  }

  const removeContact = (id) =>{
    const person = persons.find(p=>p.id===id)
    const confirmed = window.confirm(`Delete ${person.name}`)
    if (confirmed){
      personsService
      .remove(id)
      .catch(e=>{
        setMessage({text: `${person.name} has been already removed from the server`, success:false})
        setTimeout(()=>setMessage(null),5000)
      })
      setPersons(persons.filter(person => person.id!==id))
    }
  }

  const peopleToShow = persons.filter(person =>{
    return person.name.startsWith(filter) || person.number.startsWith(filter) || person.name.split(' ').some(w => w.startsWith(filter))
  }
  )

  return (
    <div>
      <h2>Phonebook</h2>
      {message && 
        <Message 
          success={message.success} 
          text={message.text}
        />
      }
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <ContactForm 
        addContact={addContact} 
        newName = {newName}
        handleNewName = {handleNewName}
        newNumber = {newNumber}
        handleNewNumber = {handleNewNumber}
      />
      <h2>Numbers</h2>
      <PersonList people={peopleToShow} handleRemove={removeContact}/>
    </div>
  )
}

export default App
