function displayTemperature(response) {
  let temperature = document.querySelector("#current-temperature");
  let currentTemperature = response.data.temperature.current;
  let city = document.querySelector("#current-city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  let currentWind = response.data.wind.speed;
  wind.innerHTML = Math.round(currentWind);

  humidity.innerHTML = Math.round(currentHumidity);
  weatherDescription.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(currentTemperature);
}

function ordinal(number) {
  number = Number(number);
  if (!number || Math.round(number) !== number) {
    return number;
  }
  var signal = number < 20 ? number : Number(("" + number).slice(-1));
  switch (signal) {
    case 1:
      return number + "st";
    case 2:
      return number + "nd";
    case 3:
      return number + "rd";
    default:
      return number + "th";
  }
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
  return `${dayFormatted} ${day(
    dateFormat
  )} ${monthFormatted},${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "o4045te388f5bc6e0abcc5fba3a40236";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

let currentDate = document.querySelector("#current-date");
let date = new Date();
currentDate.innerHTML = dateFormat(date);

searchCity("Winchburgh");
