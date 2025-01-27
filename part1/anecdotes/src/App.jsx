import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const DayAnecdote = ({anecdotes, selected, votes}) => {
  return (
    <>
      <h1>Anecdote of The Day</h1>
      <i>{anecdotes[selected]}</i>
      <p>This anecdote has {votes[selected]} votes.</p>
    </>
  )
}

const PopularAnecdote = ({ anecdotes, mostPopularIndex, votes }) => {
  return (
    <>
      <h1>Anecdote with Most Votes</h1>
      <i>{anecdotes[mostPopularIndex]}</i>
      <p>This anecdote has {votes[mostPopularIndex]} votes.</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() *8))
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const getMostPopularIndex = () => {
    return votes.indexOf(Math.max(...votes))
  }

  const mostPopularIndex = getMostPopularIndex()

  return (
    <div>
      <DayAnecdote anecdotes={anecdotes} selected={selected} votes= {votes}/>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNextClick} text="next anecdote" />
      <PopularAnecdote anecdotes={anecdotes} mostPopularIndex={mostPopularIndex} votes={votes} />
    </div>
  )
}

export default App