// all variables used
var city;
var coordinates = [];
var search = document.getElementById("search-bar");
var button = document.getElementById("search-button");

var currentWeather = document.getElementById('current-weather');

// base url
var requestUrl =
  "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=e47eb086d90f9e94737e6cf64acdd28a";

// search for city

// show current and future conditions
// add to seach history

// current weather shows city name, date, icon, temp, humidity, wind speed
// future weather shows 5 day forecast with dates, icon, temp, wind speed, humidity

// click on search history to be taken back

// button.addEventListener("click", input);

// function input() {
//   console.log(search.value);
// }

search.addEventListener("input", (e) => {
  city = e.target.value;
  console.log(city);
  button.addEventListener("click", getCity(city));
});

// retrieves latitude and longitude from city requested
function getCity(city) {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=e47eb086d90f9e94737e6cf64acdd28a"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //   lat = data[0].lat;
      //   lat.push(data[0].lat);
      //   lon.push(data[0].lon);
      coordinates.push(data[0].lat, data[0].lon);
    });
}

// getCity(city);
console.log(coordinates);
