import { useState, useEffect } from 'react';
import countriesService from './services/countries';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then(initialCountries => {
      setCountries(initialCountries);
      console.log(initialCountries);
    });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      search === ''
        ? []
        : countries.filter(country => 
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
    );
  }, [search, countries]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1 className='findCountries'>✨find countries✨</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <input value={search} onChange={handleSearchChange} />
      </form>
      <Countries countries={filteredCountries} setCountries={setFilteredCountries} />
    </div>
  );
};

export default App;
