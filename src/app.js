function formatDate(timestamp){
  let currentDate = new Date(timestamp);
  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentDate.getDay()];
  
  let months = [
    "January",
    "Februar",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[currentDate.getMonth()];
  
  let date = currentDate.getDate();

  return `${day}, ${month} ${date}`;
}

function hourFormat(timestamp){
  let currentDate = new Date(timestamp);
  
  let hours = currentDate.getHours();
  if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10){
    minutes = `0${minutes}`;
  }
  return`${hours}:${minutes}`
}

document.querySelector("#hour").innerHTML = hourFormat();

function formatDays(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDate = new Date(timestamp);
  let day = days[currentDate.getDay()];
  return `${day}`;
}

function displayForecast(response){

  let forecast = response.data.daily[0];
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = `<div class="col">
              <p class="week-days">
                ${formatDays(forecast.dt * 1000)}
              </p>
              <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weather icon" id="day-1-icon">
              <p class="description-forecast">
                ${forecast.weather[0].description}
              </p>
              <div class="row min-max-temp">
                <div class="col max-temp">
                  ${Math.round(forecast.temp.max)}°C | ${Math.round((forecast.temp.max * 9) / 5) + 32}°F
                </div>
                <div class="col min-temp">
                  ${Math.round(forecast.temp.min)}°C | ${Math.round((forecast.temp.min * 9) / 5) + 32}°F
                </div>
              </div>
            </div>`;
console.log(forecast);
}

function displayTemperature(response){
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity-data").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-data").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description)
  document.querySelector("#date").innerHTML = formatDate(response.data.dt *1000);
  document.querySelector("#sunrise-time").innerHTML = hourFormat(response.data.sys.sunrise * 1000);
  document.querySelector("#sunset-time").innerHTML = hourFormat(response.data.sys.sunset * 1000);
  
  celsiusTemperature = Math.round(response.data.main.temp);

  let apiKey = "027401657e14d2712c8487adaadbd48b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(city){
  let apiKey = "027401657e14d2712c8487adaadbd48b";
  let apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  
}

function handlesubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

document.querySelector("#search-form").addEventListener("submit", handlesubmit);

function displayFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5+ 32
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Cork");