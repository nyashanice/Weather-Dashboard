// variables used
var city;
var lat = "";
var lon = "";
var search = document.getElementById("search-bar");
var button = document.getElementById("search-button");

var currentCity = document.getElementById("city-and-date");
var currentWeather = document.getElementById("weather-icon");
var currentTemp = document.getElementById("current-temp");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");

var dayOneDate = document.getElementById("day1-date");
var dayTwoDate = document.getElementById("day2-date");
var dayThreeDate = document.getElementById("day3-date");
var dayFourDate = document.getElementById("day4-date");
var dayFiveDate = document.getElementById("day5-date");

var dayOneIcon = document.getElementById("day1-weather");
var dayTwoIcon = document.getElementById("day2-weather");
var dayThreeIcon = document.getElementById("day3-weather");
var dayFourIcon = document.getElementById("day4-weather");
var dayFiveIcon = document.getElementById("day5-weather");

var dayOneTemp = document.getElementById("day1-temp");
var dayTwoTemp = document.getElementById("day2-temp");
var dayThreeTemp = document.getElementById("day3-temp");
var dayFourTemp = document.getElementById("day4-temp");
var dayFiveTemp = document.getElementById("day5-temp");

var dayOneWind = document.getElementById("day1-wind");
var dayTwoWind = document.getElementById("day2-wind");
var dayThreeWind = document.getElementById("day3-wind");
var dayFourWind = document.getElementById("day4-wind");
var dayFiveWind = document.getElementById("day5-wind");

var dayOneHumidity = document.getElementById("day1-humidity");
var dayTwoHumidity = document.getElementById("day2-humidity");
var dayThreeHumidity = document.getElementById("day3-humidity");
var dayFourHumidity = document.getElementById("day4-humidity");
var dayFiveHumidity = document.getElementById("day5-humidity");

var searchHistory = [];
var searchItems;

// calls getCity function once user types in city and clicks search
search.addEventListener("input", (e) => {
  e.preventDefault();
  city = e.target.value;
  button.addEventListener("click", function () {
    saveCity(city);
    getCity(city);
  });
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
      lat = data[0].lat;
      lon = data[0].lon;
      getWeather(lat, lon);
    });
}

// retrieves and adds weather data to html elements
function getWeather(lat, lon) {
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=e47eb086d90f9e94737e6cf64acdd28a&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // current day's weather
      currentCity.textContent =
        data.city.name + " " + data.list[0].dt_txt.slice(0, 10);
      currentTemp.textContent = "Temp: " + data.list[0].main.temp + "\u2109";
      currentWind.textContent = "Wind: " + data.list[0].wind.speed + " MPH";
      currentHumidity.textContent =
        "Humidity: " + data.list[0].main.humidity + "%";

      // future 5 day's weather
      dayOneDate.textContent = data.list[7].dt_txt.slice(0, 10);
      dayOneTemp.textContent = "Temp: " + data.list[7].main.temp_max + "\u2109";
      dayOneWind.textContent = "Wind: " + data.list[7].wind.speed + " MPH";
      dayOneHumidity.textContent =
        "Humidity: " + data.list[7].main.humidity + "%";

      dayTwoDate.textContent = data.list[17].dt_txt.slice(0, 10);
      dayTwoTemp.textContent =
        "Temp: " + data.list[17].main.temp_max + "\u2109";
      dayTwoWind.textContent = "Wind: " + data.list[17].wind.speed + " MPH";
      dayTwoHumidity.textContent =
        "Humidity: " + data.list[17].main.humidity + "%";

      dayThreeDate.textContent = data.list[25].dt_txt.slice(0, 10);
      dayThreeTemp.textContent =
        "Temp: " + data.list[25].main.temp_max + "\u2109";
      dayThreeWind.textContent = "Wind: " + data.list[25].wind.speed + " MPH";
      dayThreeHumidity.textContent =
        "Humidity: " + data.list[25].main.humidity + "%";

      dayFourDate.textContent = data.list[33].dt_txt.slice(0, 10);
      dayFourTemp.textContent =
        "Temp: " + data.list[33].main.temp_max + "\u2109";
      dayFourWind.textContent = "Wind: " + data.list[33].wind.speed + " MPH";
      dayFourHumidity.textContent =
        "Humidity: " + data.list[33].main.humidity + "%";

      dayFiveDate.textContent = data.list[39].dt_txt.slice(0, 10);
      dayFiveTemp.textContent =
        "Temp: " + data.list[39].main.temp_max + "\u2109";
      dayFiveWind.textContent = "Wind: " + data.list[39].wind.speed + " MPH";
      dayFiveHumidity.textContent =
        "Humidity: " + data.list[39].main.humidity + "%";
    });
}

// saves city to array in local storage
function saveCity(city) {
  searchItems = JSON.parse(localStorage.getItem("city"));
  searchHistory.push(city);
  var uniqueCities = [...new Set(searchHistory)];
  localStorage.setItem("city", JSON.stringify(uniqueCities));
}

// loads search history when accessing page
function loadSearchHistory() {
  searchItems = JSON.parse(localStorage.getItem("city"));
  if (!searchItems) {
    localStorage.setItem("city", JSON.stringify([]));
  }
}

// shows search history as a list on left side of page
function renderSearchHistory() {
  searchItems = JSON.parse(localStorage.getItem("city"));
  var list = document.getElementById("search-list");
  for (i = 0; i < searchItems.length; i++) {
    if (searchItems !== null) {
      var pastSearch = document.createElement("li");
      pastSearch.classList.add("list-group-item");
      pastSearch.appendChild(document.createTextNode(searchItems[i]));
      list.appendChild(pastSearch);
    }
  }
}

function init() {
  loadSearchHistory();
  renderSearchHistory();
}

init();
