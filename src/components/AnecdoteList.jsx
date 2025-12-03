import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

// Component to display a single anecdote
const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

// Component to display the list of anecdotes
const AnecdoteList = () => {
  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  // Get anecdotes from the Redux store, applying the filter
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    // If there's no filter, return all anecdotes
    if (filter === "") {
      return anecdotes;
    }

    // Filter anecdotes based on the filter string
    const anecdotesFilter = (anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase());
    return filter !== "" ? anecdotes.filter(anecdotesFilter) : [];
  });

  // Function to handle voting for an anecdote
  const addVoteToAnecdote = async (id) => {
    //console.log("vote", id);
    dispatch(voteAnecdote(id));

    dispatch(
      showNotification(
        "You voted '" + anecdotes.find((a) => a.id === id).content + "'"
      )
    );
  };

  // Create a sorted copy of anecdotes based on votes in descending order
  const sorted = [...anecdotes].sort((a, b) => a.votes - b.votes);

  return (
    <div>
      {sorted.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => addVoteToAnecdote(anecdote.id)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
