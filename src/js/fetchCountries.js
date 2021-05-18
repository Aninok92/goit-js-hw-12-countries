const BASE_URL = 'https://restcountries.eu/rest/v2';

export default function fetchCountries(country) {
  return fetch(`${BASE_URL}/name/${country}`).then(response => {
    return response.json();
  });
}
