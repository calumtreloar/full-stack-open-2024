const MultipleCountryDetails = ({ countries, onSelectCountry }) => {
  const showDetails = country => {
    onSelectCountry(country);
  };
  return (
    <div>
      {countries.map((country, i) => {
        return (
          <div key={i}>
            <p>
              {country.name.common}{" "}
              <button onClick={() => showDetails(country)}>show</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MultipleCountryDetails;
