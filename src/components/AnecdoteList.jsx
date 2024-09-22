import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes;
    }
    const anecdotesFilter = (anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase());
    return filter !== "" ? anecdotes.filter(anecdotesFilter) : [];
  });

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteFor(id));
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => a.votes - b.votes)
        .map((anecdote) => (
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
