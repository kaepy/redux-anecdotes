import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  // Use React Query to fetch notes
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false, // Disable refetch on window focus
    //retry: false, // Disable automatic retries
    //retry: 2, // Number of retry attempts
  })

  // Debugging: log the result object
  console.log(JSON.parse(JSON.stringify(result)))

  // Handle loading state
  if (result.isLoading) {
    return <div>loading anecdotes...</div>
  }

  // Handle error state
  if (result.isError) {
    return <span>Anecdote service not available due to problems in server</span>
    //return <span>Error: {result.error?.message}</span> // Optional chaining to avoid undefined error
  }

  const anecdotes = result.data // Extract notes from the result

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
