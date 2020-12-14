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

document.querySelector("#hour").innerHTML = hourFormat(new Date());

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
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for(let index = 1; index < 7; index++){
    forecast = response.data.daily[index];
    forecastElement.innerHTML += `<div class="col">
                <p class="week-days">
                  ${formatDays(forecast.dt * 1000)}
                </p>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weather icon" class="forecast-icon" id="day-1-icon">
                <p class="description-forecast">
                  ${forecast.weather[0].description}
                </p>
                <div class="row min-max-temp">
                  <div class="col">
                    <span class="max-temp" id="forecast-max">${Math.round(forecast.temp.max)}</span><span class="degree-sign-max">°</span> |
                    <span class="min-temp" id="forecast-min">${Math.round(forecast.temp.min)}</span><span class="degree-sign-min">°</span>
                  </div>
                </div>
              </div>`;
  }
}

function changeSentence(response){
  let sentence = document.querySelector("#catch-phrase");
  if(response.data.main.temp >=25){sentence.innerHTML =
    `Sea, cocktail 🍸 and sun! Don't forget the sunscreen 😎`;
  } else if(response.data.main.temp >=20) {sentence.innerHTML =
    `Goodbye Winter, hello Spring 👋`;
  } else if(response.data.main.temp >=15) {sentence.innerHTML =
    `We love you Mr. Blue sky 😻`;
  } else if(response.data.main.temp >=5){ sentence.innerHTML = 
    `Maybe a second layer wouldn't be too much after all 🤷`;
  } else if(response.data.main.temp >=0){ sentence.innerHTML = 
    `Brrr it's way too cold out there 🥶`;
  } else {
    sentence.innerHTML = `The answer is yes! There was enough space on that floating door 😿`;
  }
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
  document.querySelector("#sunrise-time").innerHTML = hourFormat((response.data.sys.sunrise + response.data.timezone) * 1000);
  document.querySelector("#sunset-time").innerHTML = hourFormat((response.data.sys.sunset + response.data.timezone) * 1000);

  celsiusTemperature = Math.round(response.data.main.temp);
  celciusTemperatureReal = Math.round(response.data.main.feels_like);

  changeSentence(response);

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
  
  let fahrenheitTemperatureReal = (celciusTemperatureReal * 9 / 5) + 32;
  document.querySelector("#feels-like").innerHTML = Math.round(fahrenheitTemperatureReal);

  document.querySelectorAll("#forecast-max").forEach(function (item) {
  let currentTemp = item.innerHTML;
  item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });
  
  document.querySelectorAll("#forecast-min").forEach(function (item) {
  let currentTemp = item.innerHTML;
  item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });

  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
  celsiusLink.addEventListener("click", displayCelsiusTemperature);

}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML = celsiusTemperature;

  document.querySelector("#feels-like").innerHTML = Math.round(celciusTemperatureReal);

  document.querySelectorAll("#forecast-max").forEach(function (item) {
  let currentTemp = item.innerHTML;
  item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
  
  document.querySelectorAll("#forecast-min").forEach(function (item) {
  let currentTemp = item.innerHTML;
  item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
    
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
  celsiusLink.addEventListener("click", displayCelsiusTemperature);
}

let celsiusTemperature = null;
let celciusTemperatureReal = null;

let fahrenheitLink = document.querySelector("#imperial-btn")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#metric-btn");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Cork");