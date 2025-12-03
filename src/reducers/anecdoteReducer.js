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
      const updated = action.payload;
      return state.map((a) => (a.id !== updated.id ? a : updated));
    },
    // Action to set the entire anecdotes state
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

// Extract the action creator for setting anecdotes
const { setAnecdotes, createAnecdote, voteFor } = anecdoteSlice.actions;

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

// Thunk action to vote for an anecdote
export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    // getState to access current state
    // Find the anecdote to vote for
    const anecdoteToVote = getState().anecdotes.find((a) => a.id === id);
    // Create updated anecdote object with incremented votes
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    };
    // Send the updated anecdote to the service
    const savedAnecdote = await anecdoteService.addVote(id, votedAnecdote);
    // Dispatch the voteFor action with the saved anecdote
    dispatch(voteFor(savedAnecdote));
  };
};

export default anecdoteSlice.reducer;
