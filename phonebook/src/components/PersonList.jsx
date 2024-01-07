import Person from "./Person"

const PersonList = ({people, handleRemove})=>{
  return(
    <>
      {
        people.map(person=>{
          return <Person key={person.name} person={person} handleRemove={()=>handleRemove(person.id)}/>
        })
      }
    </>
  )
}

export default PersonList;