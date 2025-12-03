import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

// Component for adding a new anecdote
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  // Function to handle form submission
  const addAnecdote = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const content = event.target.anecdote.value; // Get anecdote content from form input
    event.target.anecdote.value = ""; // Clear the input field

    const newAnecdote = await anecdoteService.createNew(content); // Create new anecdote via service
    dispatch(createAnecdote(newAnecdote)); // Dispatch action with the new anecdote object
    dispatch(showNotification("You created new anecdote '" + content + "'")); // Show notification for the created anecdote
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div style={{ marginBottom: "4px" }}>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
