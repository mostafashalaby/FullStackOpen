import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
      return filter === ''
        ? anecdotes
        : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))  
    })

    const dispatch = useDispatch()

    const voteHandler = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(showNotification(`You voted for '${anecdote.content}'`, 5))

    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteHandler(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
