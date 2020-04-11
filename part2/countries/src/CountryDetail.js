import React from "react";

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital : {country.capital}</p>
      <p>Population : {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.iso639_2}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} style={{width:'200px'}}></img>
    </div>
  );
};

export default CountryDetail;
