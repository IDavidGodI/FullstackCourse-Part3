import Person from "./Person"

const PersonList = ({people, handleRemove})=>{
  return(
    <>
      {
        people.map(person=>{
          return <Person key={person._id} person={person} handleRemove={()=>handleRemove(person._id)}/>
        })
      }
    </>
  )
}

export default PersonList;