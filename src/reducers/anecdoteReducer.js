import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // Action to create a new anecdote
    createAnecdote(state, action) {
      state.push(action.payload);
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
    // Action to set the entire anecdotes state
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

// Extract the action creator for setting anecdotes
const { setAnecdotes, createAnecdote } = anecdoteSlice.actions;

// Thunk action to initialize anecdotes from the service
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const { voteFor } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
