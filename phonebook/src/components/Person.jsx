const Person = ({person, handleRemove})=>{
  return(
    <>
      <p>{person.name} {person.number} <button onClick={handleRemove}>delete</button> </p> 
    </>
  )
}

export default Person;