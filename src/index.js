import './css/styles.css';

import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

import API from "./fetchCountries.js"

const DEBOUNCE_DELAY = 300;

const input = document.getElementById("search-box");
console.log(input);


const countryInfo = document.querySelector(".country-info");
console.log(countryInfo);

input.addEventListener("input",debounce(onSubmit,DEBOUNCE_DELAY))

function onSubmit (e) {  
const inputValue = e.target.value.trim();
   

 API.fetchCountries(inputValue).then((countries) => {
  if (countries.length === 0) {
   throw new Error ("No country")  
}  
   return countries.reduce((markup,countries) => creatingMarkup(countries) + markup, "") ;
 
   
 }).then(update)
 .catch(onError)
}



function creatingMarkup ({name,population,capital,languages,flags}) {
 
  

return`<ul class = "list">
 <li>
 <img src = "${flags.png}" alt = "flag country" width = "100px" height = "100px"> <h1> ${name.official}</h1> </li>

 <li> <span> Capital: </span> ${capital} </li>
 <li> <span> Population: </span> ${population} </li>
 <li> <span> Languages: </span> ${languages} </li>
 
 </ul>
 `


}

function update (markup) {
        countryInfo.innerHTML = markup   
}

function onError (err) {
        console.log(err);
        Notiflix.Notify.failure("Oops, there is no country with that name");   
       
}