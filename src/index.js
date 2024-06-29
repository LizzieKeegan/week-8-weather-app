function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let roundedTemperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidityData = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#weather-app-icon");
  let iconURL = response.data.condition.icon_url;
  let iconImage = `<img src="${iconURL}">`;

  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = roundedTemperature;
  weatherIcon.innerHTML = iconImage;
  cityElement.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  humidityData.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
}
function formatDate(date) {
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "3bt55of44c88990a4f0ababb8d8f6206";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = searchInput.value;
  searchCity(city);
}

function getForecast(city) {
  let apiKey = "3bt55of44c88990a4f0ababb8d8f6206";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` <div class="row">
            <div class="col-2">
              <div class="weather-forecast-day">${formatDay(day.time)}</div>
              <img
                src="${day.condition.icon_url}"
                alt=""
                
              />
             <div class="temperature-container"> 
             <span class="weather-forecast-temperature-max" id="weather-forecast-temperature-max">${
               day.temperature.maximum
             }°</span>
              <span class="weather-forecast-temperature-min" id="weather-forecast-temperature-min">${
                day.temperature.minimum
              }°</span>
              </div>
            </div>
          </div>`;
    }
  });

  let forecast = document.querySelector("#forecast");
  console.log(response);
  console.log(day.temperature.maximum);

  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
getForecast("London");
