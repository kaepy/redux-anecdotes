import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";

// Component to display a single anecdote
const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
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
    if (filter === "") {
      return anecdotes;
    }

    // Filter anecdotes based on the filter string
    const anecdotesFilter = (anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase());
    return filter !== "" ? anecdotes.filter(anecdotesFilter) : [];
  });

  // Function to handle voting for an anecdote
  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteFor(id));
  };

  // Create a sorted copy of anecdotes based on votes in descending order
  const sorted = [...anecdotes].sort((a, b) => a.votes - b.votes);

  return (
    <div>
      {sorted.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
