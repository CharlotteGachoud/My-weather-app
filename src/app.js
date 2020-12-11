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
                  <div class="col max-temp">
                    ${Math.round(forecast.temp.max)}°C ${Math.round((forecast.temp.max * 9) / 5) + 32}°F
                  </div>
                  <div class="col min-temp">
                    ${Math.round(forecast.temp.min)}°C ${Math.round((forecast.temp.min * 9) / 5) + 32}°F
                  </div>
                </div>
              </div>`;
  }
}

function changeSentence(response){
  let sentence = document.querySelector("#catch-phrase");
  if(response.data.main.temp >= 25){sentence.innerHTML =
    `Mr. Blue Sky please tell us why, you had to hide away for so long, so long. Where did we go wrong? 🌞`;
  } else if(response.data.main.temp >= 20) {sentence.innerHTML =
    `Hey there Mr. Blue, we're so pleased to be with you. Look around see what you do, everybody smiles at you 😁`;
  } else if(response.data.main.temp <=5){ sentence.innerHTML = 
    `Don't forget your scarf and hat 🧣`;
  } else if(response.data.main.temp <= 0 || response.data.weather[0].main == "snow"){
    sentence.innerHTML = `Winter coats 🧥 and snowboots 👢 are a must`;
  } else if(response.data.weather[0].main == "Rain" || response.data.weather[0].main == "Drizzle"){
    sentence.innerHTML = `Where is your umbrella, ella, ella, eh, eh, eh 🌂`;
  } else if(response.data.weather[0].main == "Thuderstorm"){
    sentence.innerHTML = `Try not to get THUNDERSTRUCK 🌩`;
  } else if(response.data.weather[0].main == "Mist" 
  || response.data.weather[0].main == "Smoke"
  || response.data.weather[0].main == "Haze"
  || response.data.weather[0].main == "Dust"
  || response.data.weather[0].main == "Fog"
  || response.data.weather[0].main == "Sand"
  || response.data.weather[0].main == "Ash"){
    sentence.innerHTML = `Even when the mist fogs up our sight still there is a way out 🌫`;
  } else if(response.data.weather[0].main == "Squall" || response.data.weather[0].main == "Tornado" ){
    sentence.innerHTML = `You better seek a shelter! 🌪`;
  } else {
    sentence.innerHTML = `Aren't you glad you checked the forecast before planning your trip? 👍`;
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