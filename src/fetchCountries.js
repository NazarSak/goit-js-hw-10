const API_URL = 'https://restcountries.com/v3.1/name/';
const API_KEY = "6d95100ec0704125bc081e8c4e18c71c"

function fetchCountries(name) {
return fetch(`${API_URL}${name}?fields = name.official,capital,population,flags.svg,languages`)
.then((res) =>  res.json());   
}

export default {fetchCountries};

