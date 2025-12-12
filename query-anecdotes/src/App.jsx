import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useNotification } from './hooks/useNotification'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  // Mutation for creating a new anecdote
  const queryClient = useQueryClient()

  // Mutation for creating a new anecdote
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    // Invalidate anecdotes so the list refreshes after create
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) // Get current anecdotes from cache
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote)) // Update cache directly: add new anecdote
      showNotification(`anecdote '${newAnecdote.content}' created`, 5000)
    },
  })

  // Mutation for updating an anecdote
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote, // Update anecdote function
    onSuccess: (updateAnecdote) => {
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) => (a.id !== updateAnecdote.id ? a : updateAnecdote)),
      ) // Update cache directly: replace updated anecdote
      showNotification(`anecdote '${updateAnecdote.content}' voted`, 5000)
    },
  })

  // Get showNotification from notification hook
  const { showNotification } = useNotification()

  // Anecdote have to be at least 5 digits long - No error handling yet!
  const addAnecdote = async (event) => {
    console.log('add new anecdote')
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  const handleVote = (anecdote) => {
    console.log('vote anecdote')
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
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
