import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector("#search-box");
const countryListEl = document.querySelector(".country-list");
const countryInfoEl = document.querySelector(".country-info");
console.log(countryInfoEl.outerText)
const fetchCountries = (countryName) => {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
}
inputEl.addEventListener('input', (event) => {
    let lalka = event.currentTarget.value.length
    console.log(event.currentTarget.value.length);
    if (event.currentTarget.value.length === 0)  {   
        countryListEl.innerHTML = "";
        countryInfoEl.innerHTML = "";
    }    
    fetchCountries(event.currentTarget.value)   
     .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }     
        return response.json();
      }).then(data => {
        console.log(data.length)
        if (data.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else
        if (data.length > 2 && data.length < 10) {
            renderCountriesList(data);
        } else
         if (data.length === 1) {
             console.log(inputEl.value.length)
            renderCountriesInfo(data[0])
         }  
       
      })
      .catch(error => {
          if (inputEl.value.length > 6 && error) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            countryListEl.innerHTML = "";
            countryInfoEl.innerHTML = "";
          }      
      });
})

const renderCountriesInfo = (countryName) => {
    countryListEl.innerHTML = "";
    console.log(countryName)
    let pipka = [];
    for (const key in countryName.languages) {
        pipka.push(countryName.languages[key])
    }
    if (countryInfoEl.outerText === "") { 
   countryInfoEl.insertAdjacentHTML("beforeend",` 
   <div class="flex-container">
   <img src="${countryName.flags.png}" alt="" class="imges"> <h2 class="title">${countryName.name.official}</h2>
   </div>
    <ul class="list">
    
      <li class="item">
        <p class="text"><span class="span">Capital:${" "}</span>${countryName.capital}</p>
        </li>
        <li class="item">
        <p class="text"><span class="span">Population:${" "}</span>${countryName.population}</p>
        </li>
        <li class="item">
        <p class="text"><span class="span">Languages:${" "}</span>${pipka}</p>
        </li>     
    </ul>`);
    }
}
const renderCountriesList = (countryName) => {
    countryInfoEl.innerHTML = "";
 const markup = countryName.map((element) => 
  `<div class="flex-container">
  <img src="${element.flags.png}" alt="" class="less-img">
  <h3 class="less-title">${element.name.official}</h3>
</div>`).join("");
 countryListEl.innerHTML = markup;
}

