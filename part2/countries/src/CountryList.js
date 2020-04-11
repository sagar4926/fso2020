import React, { useState, useEffect } from "react";
import CountryDetail from "./CountryDetail";

const CountryList = ({ countries }) => {
  const [flagShowCountryDetail, setFlagShowCountryDetail] = useState({});

  useEffect(() => {
    const map = {};
    countries.forEach((country) => {
      map[country.alpha3Code] = false;
    });
    setFlagShowCountryDetail(map);
  }, [countries]);

  const toggleShowCountryDetail = (alpha3Code) => {
    const copy = { ...flagShowCountryDetail };
    copy[alpha3Code] = !copy[alpha3Code];
    setFlagShowCountryDetail(copy);
  };

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.alpha3Code} style={{ listStyleType: "none" }}>
          {country.name}
          <button
            onClick={() => {
              toggleShowCountryDetail(country.alpha3Code);
            }}
          >
            {flagShowCountryDetail[country.alpha3Code] ? "Hide" : "Show"}
          </button>
          {flagShowCountryDetail[country.alpha3Code] ? (
            <CountryDetail country={country}></CountryDetail>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
