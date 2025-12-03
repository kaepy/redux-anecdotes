import { createSlice } from "@reduxjs/toolkit";

// Helper function to generate unique IDs
const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
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
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, voteFor, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
