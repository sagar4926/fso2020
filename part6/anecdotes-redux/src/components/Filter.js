import React from "react";
import { connect } from "react-redux";
import { clearFilter, setFilter } from "../reducers/filterReducer";
const Filter = ({ filter, clearFilter, setFilter }) => {
  const clear = () => {
    clearFilter();
  };
  const filterChanged = (e) => {
    setFilter(e.target.value);
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};
const mapDispatchToProps = {
  clearFilter,
  setFilter,
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
