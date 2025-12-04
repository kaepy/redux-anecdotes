import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { initializeAnecdotes } from "./reducers/anecdoteReducer";

import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

// Main App component rendering
const App = () => {
  const dispatch = useDispatch();

  // Fetch anecdotes from the server when the component mounts and set them in the Redux store
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
