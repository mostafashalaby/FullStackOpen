import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
      return filter === ''
        ? anecdotes
        : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))  
    })

    const dispatch = useDispatch()

    const voteHandler = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`You voted for '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)    

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
