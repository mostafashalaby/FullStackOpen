const Note = ({ note, handleDelete }) => {
    return (
      <li>
        {note.name} {note.number} <button onClick={handleDelete}>delete</button>
      </li>
    )
  }
  
export default Note