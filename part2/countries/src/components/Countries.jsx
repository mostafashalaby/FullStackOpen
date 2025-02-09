const Countries = ({ countries, setCountries }) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countries.length > 1 && countries.length <= 10 || countries.length === 0) {
        return (
            <ul>
            {countries.map(country =>
                <li key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => setCountries([country])}>show</button>
                </li>
            )}
          </ul>
        );
    } else {
        const country = countries[0]
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p><i>Capital:</i> {country.capital}</p>
                <p><i>Population:</i> {country.population}</p>
                <h2>Languages</h2>
                <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
                </ul>
                <img src={country.flags.png} alt={country.name.common} />
            </div>
            );
    }
}
  
  export default Countries