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
const inputValue = e.target.value;
const trim = inputValue.trim();   

 API.fetchCountries(trim).then((countries) => {
  if (countries.length === 0) {
   throw new Error ("No country")  

}  else if (countries.length === 1) {
       return creatingMarkup(countries[0]) 
    
      
} 
  else if (countries.length > 10) {
    
     return   Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")        
        list.innerHTML = "";
        countryInfo.innerHTML = "";
 }  


        return  countries.reduce((markup,countries) => creatMarkup(countries) + markup, "");
       
          
      



   
 })
   .then(update)
   .catch(onError)
}



function creatingMarkup ({name,population,capital,languages,flags}) {

const allLanguage = Object.values(languages)

        const card = `
  <div>

  <img src = "${flags.png}" alt = "flag country" width = "100px" height = "100px"> 
  <h1> ${name.official}</h1> 
  <p> Capital: </span> ${capital} </p>
  <p> Population: </span> ${population} </p>
  <p> Languages: </span> ${allLanguage} </p>
 
 </div>

 `;
 
 countryInfo.innerHTML = card 
}





function creatMarkup ({name,flags}) {
        return`
         <img src = "${flags.png}" alt = "flag country" width = "100px" height = "100px"> <h1> ${name.official}</h1> 
         `
        }

        
function update (markup) {
        list.innerHTML = markup    
}


// eror 
function onError (err) {
        console.log(err);
        Notiflix.Notify.failure("Oops, there is no country with that name");
        list.innerHTML = "";
        countryInfo.innerHTML = "";
}




