fetch("https://restcountries.com/v3.1/name/qatar")
  .then((res) => {
    return res.json();
  })
  .then((res) => console.log(res));

const searchFor = document.getElementById("search");
const searchBtn = document.querySelector("button");
const alertError = document.getElementById("errorAlert");
const info = document.querySelector(".info");
let data = [];
searchBtn.onclick = (e) => {
  e.preventDefault();
  const countryName = searchFor.value;
  if (
    (countryName !== "") | (countryName !== null) &&
    countryName.length >= 3
  ) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => {
        if (response.status === 404) {
          alertError.style.display = "block";
        } else {
          alertError.style.display = "none";
          return response.json();
        }
      })
      .then((response) => {
        data = response;
        // console.log(data);
        fillInfo();
      });
  } else {
    alertError.style.display = "block";
  }
};

const closeIcon = document.getElementById("errorIcon");

closeIcon.onclick = () => {
  alertError.style.display = "none";
};

function fillInfo() {
  info.style.display = "flex";
  const countryName = document.getElementById("countryName");
  const country_name = data[0].name.common;
  countryName.textContent = `${country_name}`;
  //img
  const flag = document.getElementById("countryFlag");
  flag.src = data[0].flags.svg;
  // capital
  const capital = document.getElementById("capital");
  capital.textContent = `Capital : ${data[0].capital.toString()}`;
  // language;
  const language = document.getElementById("language");
  const lang = data[0].languages;
  language.textContent = `Language : ${Object.values(lang)[0]}`;
  // currency;
  const currency = document.getElementById("currency");
  const curr = data[0].currencies;
  console.log(curr);
  currency.textContent = `Currency : ${Object.keys(curr)[0]}`;
  //continent
  const continent = document.getElementById("continents");
  continent.textContent = `Continent : ${data[0].continents.toString()}`;
  //population
  const population = document.getElementById("population");
  population.textContent = `Population : ${data[0].population}`;
  //startOfWeek
  const startOfWeek = document.getElementById("startOfWeek");
  startOfWeek.textContent = `Start of week : ${data[0].startOfWeek}`;
  //map
  const map = document.getElementById("map");
  map.textContent = "MAP";
  map.href = data[0].maps.googleMaps;
}
