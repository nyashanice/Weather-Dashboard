var requestUrl =
  "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=e47eb086d90f9e94737e6cf64acdd28a";

// search for city

var requestCity =
  "api.openweathermap.org/data/2.5/forecast?q={city name}&appid=47eb086d90f9e94737e6cf64acdd28a";
var getCoordinates =
  "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=47eb086d90f9e94737e6cf64acdd28a";
// show current and future conditions
// add to seach history

// current weather shows city name, date, icon, temp, humidity, wind speed
// future weather shows 5 day forecast with dates, icon, temp, wind speed, humidity

// click on search history to be taken back
var city = "Atlanta";
var lat;
var lon;

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
      lat = data[0].lat;
      lon = data[0].lon;
      console.log(lat, lon);
    });
}

getCity(city);
