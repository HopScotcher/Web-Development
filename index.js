let toggleBtn = document.querySelector("#more-info-btn");

let moreInfoDiv = document.querySelector(".hidden-info-main");
let innerInfoDiv = document.querySelector(".hidden-info");
let searchBtn = document.querySelector(".searchBtn");

let reloadBtn = document.querySelector(".reloadBtn");

let closeBtn = document.querySelector(".fa-circle-xmark");

closeBtn.addEventListener("click", closeMoreInfo);

function closeMoreInfo() {
  moreInfoDiv.classList.toggle("show");
}

toggleBtn.addEventListener("click", () => {
  closeMoreInfo();
  console.log("toggled");
  // moreInfoDiv.style.display = "flex";
  // if (moreInfoDiv.style.display === "none") {
  //   moreInfoDiv.style.display = "flex";
  //   console.log("display is now flex");
  // } else {
  //   moreInfoDiv.style.display = "none";
  //   console.log("display is now none");
  // }
});

moreInfoDiv.addEventListener("click", (event) => {
  if (moreInfoDiv.style.display !== "none") {
    if (!innerInfoDiv.contains(event.target)) {
      console.log("outside clicked");
      closeMoreInfo();
    }
  }
});

reloadBtn.addEventListener("click", reloadPage);

function reloadPage() {}

window.document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  let cityToSearch = document.querySelector("#location").value;
  console.log(`city to search = ${cityToSearch}`);

  fetchData(cityToSearch);
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let cityToSearch = document.querySelector("#location").value;
  console.log(`city to search = ${cityToSearch}`);

  fetchData(cityToSearch);
});

// function searchCity(e) {
//   e.preventDefault();
//   let cityToSearch = document.querySelector("#location").value;
//   console.log(`city to search = ${cityToSearch}`);

//   fetchData(cityToSearch);
// }

function fetchData(cityToSearch) {
  // if(e){
  // e.preventDefault();

  const apiKey = "9c761b41ec1a4d3f88062859232803";

  if (cityToSearch === "" || cityToSearch == null) {
    cityToSearch = "nyeri";
  }

  console.log(cityToSearch);

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityToSearch}&aqi=no`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayData(data);
    })
    .catch((error) => console.error(error));
}

function displayData(data) {
  /* All HTML elements */

  let city = document.querySelector("#location");

  // let city = cityToSearch;

  /* mid section elements */
  let weatherImg = document.querySelector(".img-container"); // add innerhtml with src as specified in api
  let temp = document.querySelector(".temperature");
  let description = document.querySelector(".description");

  let windspeed = document.querySelector(".wind-data");
  let uv = document.querySelector(".uv-data");
  let precip = document.querySelector(".precip-data");

  /* bottom section */
  let windDirection = document.querySelector(".wind-direction-data");
  let pressure = document.querySelector(".atm-pressure-data");
  let humidity = document.querySelector(".humidity-data");
  let visibility = document.querySelector(".visibility-data");

  ///    UPDATING DATA    ///

  city.value = `${data.location.name}, ${data.location.country}`;

  weatherImg.innerHTML = ` <img src="${data.current.condition.icon}"
  alt="cloud" />`;

  temp.innerText = `${data.current.temp_c}ºC `;

  description.innerText = data.current.condition.text;

  windspeed.innerText = `${data.current.wind_kph} km/h`;

  uv.innerText = data.current.uv;

  precip.innerText = data.current.precip_mm;

  windDirection.textContent = data.current.wind_dir;

  pressure.innerText = data.current.pressure_mb;

  humidity.innerText = data.current.humidity;

  visibility.innerText = `${data.current.vis_km} Km`;

  // console.log(`api data = ${data}`);
  console.log(data);
}

/*    FUTURE IMPROVEMENTS    */

// add spinner as the page loads and only display data when its received from API, display error message otherwise

// change color of icons in mid section to grayish

// change background color to sth better

// add media queries for fonts in smaller screens

// align the icons in the search bar

//the reload btn should reload the page with city in the textbox remaining constant

// add transition for the close btn both entering screen or leaving

// style the header to make it more appealing

// use a different API to find cities ,,
// and as the user types into the search box, bring up suggestions
// make it responsive for mobile