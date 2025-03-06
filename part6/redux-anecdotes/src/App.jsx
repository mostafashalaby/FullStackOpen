import { useEffect } from 'react'
import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'

import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])
  
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <VisibilityFilter />
      <div style={{ marginBottom: '20px' }}></div>
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App