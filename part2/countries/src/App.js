import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Countries from "./Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const filterChanged = (event) => {
    setFilter(event.target.value);
  };

  return <div>
    <Filter filter={filter} onChange={filterChanged}></Filter>
    <Countries countries={countries} filter={filter}></Countries>
  </div>;
}

export default App;
