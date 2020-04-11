import React from "react";
import CountryDetail from "./CountryDetail";
import CountryList from "./CountryList";

const Countries = ({ countries, filter }) => {
  const countryFilter = (country) =>
    country.name.toLowerCase().includes(filter.toLowerCase());

  const filteredCountries =
    filter && filter.length > 0 ? countries.filter(countryFilter) : countries;
  if (!filter || filter.length === 0) {
    return <p>Type something to start searching.</p>;
  } else if (filteredCountries.length === 0) {
    return <p>No matching countries, try changing your filter.</p>;
  } else if (filteredCountries.length > 10) {
    return <p>Too many matches, try something more specific.</p>;
  } else if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries[0]}></CountryDetail>;
  } else {
    return <CountryList countries={filteredCountries}></CountryList>;
  }
};

export default Countries;
