function displayTemperature(response) {
  let temperature = document.querySelector("#current-temperature");
  let currentTemperature = response.data.temperature.current;
  let city = document.querySelector("#current-city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  let currentWind = response.data.wind.speed;
  let icon = document.querySelector("#weather-app-icon");

  wind.innerHTML = Math.round(currentWind);
  humidity.innerHTML = Math.round(currentHumidity);
  weatherDescription.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(currentTemperature);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`;

  getForecast(response.data.city);
}

function dateFormat(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  let month = date.getMonth();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let monthFormatted = months[month];

  let dayFormatted = days[day];
  return `${dayFormatted} ${day} ${monthFormatted},${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>

            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}º</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}º
              </div>
            </div>
          </div>
`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

let currentDate = document.querySelector("#current-date");
let date = new Date();
currentDate.innerHTML = dateFormat(date);

searchCity("Madrid");
