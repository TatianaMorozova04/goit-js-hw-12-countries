const countryApi = "https://restcountries.eu/rest/v2/name";

const fetchCountries = (searchQuery) => fetch(`${countryApi}/${searchQuery}`, {
  mode: 'cors',
  header: {
    'Access-Control-Allow-Origin':'*',
  }
});

export default fetchCountries;
