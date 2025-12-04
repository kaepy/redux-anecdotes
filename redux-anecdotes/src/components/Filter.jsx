import { setFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const style = {
    marginBottom: 10,
  };

  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  // Function to handle input change
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    dispatch(setFilter(event.target.value));
  };

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
