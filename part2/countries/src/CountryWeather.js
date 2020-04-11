import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryWeather = ({ country_name }) => {
  const [weather, setWeather] = useState({ current: undefined });
  const token = process.env.REACT_APP_WEATHER_STACK_TOKEN;
  
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${token}&query=${country_name}`
      )
      .then((res) => {
        setWeather({ current: res.data.current });
      });
  }, []);

  const renderWeather = () => {
    if (!weather.current) {
      return <p>Weather not loaded...</p>;
    }
    return (
      <div>
        <p>
          <strong>Temperature</strong>: {weather.current.temperature} &#8451;
        </p>
        <img src={weather.current.weather_icons[0]} alt="Current weather"></img>
        <p>
          <strong>Wind</strong>: {weather.current.wind_speed} kmph. direction:{" "}
          {weather.current.wind_dir}
        </p>
      </div>
    );
  };

  return (
    <div>
      <h4>Weather in {country_name}</h4>
      {renderWeather()}
    </div>
  );
};
export default CountryWeather;
