import "../index.css"

const Message = ({text, success}) =>{
  return(
    <div className={`message ${success? "success" : "error"}`}>
      {text}
    </div>
  )
}

export default Message;