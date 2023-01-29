import './css/styles.css';

import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

import API from "./fetchCountries.js"

const DEBOUNCE_DELAY = 300;

const input = document.getElementById("search-box");
console.log(input);

const countryInfo = document.querySelector(".country-info");
console.log(countryInfo);

const list = document.querySelector(".country-list");

input.addEventListener("input",debounce(onSubmit,DEBOUNCE_DELAY))

function onSubmit (e) {  
const inputValue = e.target.value.trim();
   

 API.fetchCountries(inputValue).then((countries) => {
  if (countries.length === 0) {
   throw new Error ("No country")  

}  else if (countries.length === 1) {
        console.log(creatingMarkup(countries[0]));

} else if (countries.length > 1) {
        return countries.reduce((markup,countries) => creatMarkup(countries) + markup, "") ;    
}
  
// Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.")   


   
 }).then(update)
 .catch(onError)
}



function creatingMarkup ({name,population,capital,languages,flags}) {

const allLanguage = Object.values(languages)

        const card = `<ul class = "list">
 <li>
 <img src = "${flags.png}" alt = "flag country" width = "100px" height = "100px"> <h1> ${name.official}</h1> </li>

 <li> <span> Capital: </span> ${capital} </li>
 <li> <span> Population: </span> ${population} </li>
 <li> <span> Languages: </span> ${allLanguage} </li>
 
 </ul>
 `;
 
 countryInfo.innerHTML = card
 
}


function creatMarkup ({name,flags}) {
 
        return`
         <li>
         <img src = "${flags.png}" alt = "flag country" width = "100px" height = "100px"> <h1> ${name.official}</h1> </li>
         `
        }

function update (markup) {
        list.innerHTML = markup   
}

function onError (err) {
        console.log(err);
        Notiflix.Notify.failure("Oops, there is no country with that name");   
       input.removeEventListener("input",debounce(onSubmit,DEBOUNCE_DELAY))
}




