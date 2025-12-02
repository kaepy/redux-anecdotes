import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

// Helper function to generate unique IDs
const getId = () => (100000 * Math.random()).toFixed(0);

// Convert anecdote mock data to an object
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: anecdotesAtStart.map(asObject),
  reducers: {
    // Action to create a new anecdote
    createAnecdote(state, action) {
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0,
      });
    },
    // Action to vote for an anecdote
    voteFor(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      // Create a new object with incremented votes
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      // Return a new state array with the updated anecdote
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    },
  },
});

export const { createAnecdote, voteFor } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
