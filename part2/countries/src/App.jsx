import { useState, useEffect } from "react";
import countryService from "./services/countries";
import SingleCountryDetails from "./components/SingleCountryDetails";
import MultipleCountryDetails from "./components/MultipleCountryDetails";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then(response => {
      setCountries(response.data);
    });
  }, []);

  if (!countries) {
    return null;
  }

  const handleSearchChange = e => {
    setSearch(e.target.value);
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <label>find countries</label>
      <input type="text" value={search} onChange={handleSearchChange}></input>
      <div>
        {filteredCountries.length === 1 ? (
          <SingleCountryDetails country={filteredCountries[0]} />
        ) : filteredCountries.length > 1 && filteredCountries.length < 10 ? (
          <MultipleCountryDetails
            countries={filteredCountries}
            onSelectCountry={setSelectedCountry}
          />
        ) : (
          "Too many matches, specify another filter"
        )}
      </div>
      {selectedCountry && <SingleCountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;
