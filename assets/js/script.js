const cities = [];

const cityFormEl=document.querySelector("#city-search-form");
const cityInputEl=document.querySelector("#city");
const weatherContainerEl=document.querySelector("#current-weather-container");
const citySearchInputEl = document.querySelector("#searched-city");
const forecastTitle = document.querySelector("#forecast");
const forecastContainerEl = document.querySelector("#fiveday-container");
const pastSearchButtonEl = document.querySelector("#past-search-buttons");

// TO SUBMIT/REQUEST WEATHER OF THE PLACE
const formSumbitHandler = function(event){
    event.preventDefault();
    const city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else{
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}

// TO SAVE IT IN THE LOCAL STORAGE
const saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

const getCityWeather = function(city){
    const apiKey = "844421298d794574c100e3409cee0499"
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

const displayWeather = function(weather, searchCity){
   //TO CLEAR OLD REQUESTS
   weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;


   //CRETATE CURRENT DATE
   const currentDate = document.createElement("span")
   currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearchInputEl.appendChild(currentDate);

   //CREATE AN ICON
   const weatherIcon = document.createElement("img")
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   citySearchInputEl.appendChild(weatherIcon);

   //SPAN TO HOLD MIN AND MAX TEMP
const temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureEl.classList = "list-group-item"
  
   //SPAN TO HOLD HUMIDITY
const humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"

}