import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const SingleCountryDetails = ({ country }) => {
  console.log(country);
  const languages = country.languages ? Object.values(country.languages) : [];

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(country.latlng[0], country.latlng[1])
      .then(response => {
        setWeather(response.data);
      });
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital ? country.capital[0] : ""}</p>
      <p>area: {country.area}</p>
      <h3>languages: </h3>
      <ul>
        {languages.map((language, i) => (
          <li key={i}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.name.common}</h2>
      {weather && (
        <>
          <p>temperature {weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default SingleCountryDetails;
