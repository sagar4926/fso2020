import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, setFilter } from "../reducers/filterReducer";
const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const clear = () => {
    dispatch(clearFilter());
  };
  const filterChanged = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <>
      <input
        placeholder="Filter anecdotes"
        value={filter}
        onChange={filterChanged}
      />
      <button onClick={clear}>clear</button>
    </>
  );
};

export default Filter;
