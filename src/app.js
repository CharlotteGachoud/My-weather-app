let currentDate = new Date();
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

let fullDate = document.querySelector("#date");
fullDate.innerHTML = `${day}, ${month} ${date}`;

function displayTemperature(response){
console.log(response.data);
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
document.querySelector("#humidity-data").innerHTML = response.data.main.humidity;
document.querySelector("#wind-data").innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "027401657e14d2712c8487adaadbd48b";
let city = "Ayent";
let apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);