import { useState, useEffect } from 'react' 
import SearchBox from './components/SearchBox';
import CountryDisplay from './components/CountryDisplay';
import utils from './services/utils.js'

function App() {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState(null);
  const [result, setResult] = useState('Enter a country name')

  useEffect(() => {
    const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all';
    utils.get(baseURL)
      .then(countrylist => {
        console.log(countrylist);
        setCountries(countrylist);
      });
  }, []);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (!countries)  // initial fetch is not done
      return;

    const filteredCountries = countries.filter(country => {
      return country.name.common.toLowerCase().includes(newQuery.toLowerCase());
    });

    console.log(filteredCountries);
    setResult(filteredCountries);
      
  };

  return (
    <>
      <SearchBox label={"find countries"} value={query} onChange={handleChange} />
      <CountryDisplay displayInfo={result}/>
    </>
  );
}

export default App;
