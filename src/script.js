function displayTemperature(response) {
  let temperature = document.querySelector("#current-temperature");
  let currentTemperature = response.data.temperature.current;
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(currentTemperature);
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

searchCity("Paris");
