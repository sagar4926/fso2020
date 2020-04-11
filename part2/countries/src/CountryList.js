import React from "react";

const CountryList = ({ countries }) => {
  return <ul>
    {countries.map(country => <li key={country.alpha3Code} style={{listStyleType:'none'}}>{country.name}</li>)}
  </ul>
};

export default CountryList;
