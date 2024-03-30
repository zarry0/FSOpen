import { useState } from 'react'

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
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [mostVotedIndex, setMostVotedIndex] = useState(0)
  //let nextSelected = Math.floor(Math.random() * anecdotes.length)
  /**
   * This line is needed because if the nextSelected is the same selected
   * then setSelected will receive the same value and won't update the component
   * and since the component didn't update no newSelected value was generated and
   * the app state remains the same (until the component re-renders after clicking vote)
   * Another solution, generate nextSelected in the button's onClick handler instead
   */
  //nextSelected = nextSelected === selected ? Math.floor(Math.random() * anecdotes.length) : nextSelected;

  const handleVote = () => {
    console.log(votes)
    const newVotes = [...votes]
    newVotes[selected]++
    const newMostVotedIndex = getMostVotedIndex(newVotes, mostVotedIndex);
    setVotes(newVotes)
    console.log(newMostVotedIndex)
    setMostVotedIndex(newMostVotedIndex);
  }
   const handleClick = () => {
    console.log('selected ', selected)
    const nextSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(nextSelected)
   }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes <br/>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdotes</button>

      <h2>Anecdote with most votes</h2>
      {anecdotes[mostVotedIndex]}<br/>
      has {votes[mostVotedIndex]} votes
    </div>
  )
}

const getMostVotedIndex = (arr, currentMax) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[currentMax])
      return i;
  }
  return currentMax;
}

export default App