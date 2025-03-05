
import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {

  return (
    <div>
      <VisibilityFilter/>
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App