import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  // Mutation for creating a new anecdote
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      // Invalidate anecdotes so the list refreshes after create
      queryClient.invalidateQueries(['anecdotes'])
    },
  })

  // Anecdote have to be at least 5 digits long - No error handling yet!
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

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
      <AnecdoteForm onCreate={addAnecdote} />

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
