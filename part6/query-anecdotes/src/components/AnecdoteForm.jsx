import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = ({ addAnecdote }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const onCreate = (event) => {
    const content = event.target.anecdote.value
    addAnecdote(event)
    notificationDispatch({ type: "SET_NOTIFICATION", data: `you created '${content}'` })
    setTimeout(() => {
      notificationDispatch({ type: "SET_NOTIFICATION", data: "" })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default AnecdoteForm
