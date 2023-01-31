import './css/styles.css';

import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

import API from "./fetchCountries.js"

// all imports 


const DEBOUNCE_DELAY = 300;

const input = document.getElementById("search-box");
console.log(input);

const countryInfo = document.querySelector(".country-info");
console.log(countryInfo);

const list = document.querySelector(".country-list");

input.addEventListener("input",debounce(onSubmit,DEBOUNCE_DELAY))

// all important things


function onSubmit (e) {  
const inputValue = e.target.value.trim();
   
if (!inputValue) {
        list.innerHTML = "";
        countryInfo.innerHTML = "";
        return
}

 API.fetchCountries(inputValue.trim()).then((countries) => {
  if (countries.status === 404) {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        list.innerHTML = "";
        countryInfo.innerHTML = "";


}  else if (countries.length === 1) {
       creatingMarkup(countries[0]) 
       list.innerHTML = "";
       return;
    
      
} 
  else if (countries.length > 10) {
    
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")        
        list.innerHTML = "";
        countryInfo.innerHTML = "";
        return  
 }  
 
else if ( countries.length > 1) {
        creatMarkup(countries);
        countryInfo.innerHTML = "";
        return
}


 })
   .catch(onError)
}



function creatingMarkup ({name,population,capital,languages,flags}) {

const allLanguage = Object.values(languages)

        const card = `
  <div>

  <img src = "${flags.png}" alt = "flag country" width = "100px" height = "100px"> 
  <h1> ${name.official}</h1> 
  <p> <span class = "info-country"> Capital: </span> ${capital} </p>
  <p> <span class = "info-country"> Population: </span> ${population} </p>
  <p> <span class = "info-country"> Languages: </span> ${allLanguage} </p>
 
 </div>

 `;
 
 countryInfo.innerHTML = card 
}





function creatMarkup (countries) {
        const markup = countries.map(country => 
                 `
        <div class = "list-country">
        <img src = "${country.flags.png}" alt = "flag country" width = "50px" height = "50px"> <h1 class = "countries"> ${country.name.official}</h1> 
        </div>
        `).join("")
        
       
         list.innerHTML = markup;   
        }

        


// eror 
function onError () {
    
      
}




