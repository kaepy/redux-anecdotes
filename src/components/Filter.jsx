import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = (props) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    //const content = event.target.value;
    //event.target.value = "";
    dispatch(filterChange(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
