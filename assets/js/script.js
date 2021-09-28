const cities = [];

const cityFormEl = document.querySelector("#city-search-form");
const cityInputEl = document.querySelector("#city");
const weatherContainerEl = document.querySelector("#current-weather-container");
const citySearchInputEl = document.querySelector("#searched-city");
const forecastTitle = document.querySelector("#forecast");
const forecastContainerEl = document.querySelector("#fiveday-container");
const pastSearchButtonEl = document.querySelector("#past-search-buttons");

// TO SUBMIT/REQUEST WEATHER OF THE PLACE
const formSumbitHandler = function (event) {
    event.preventDefault();
    const city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        get5Day(city);
        cities.unshift({ city });
        cityInputEl.value = "";
    } else {
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}

// TO SAVE IT IN THE LOCAL STORAGE
const saveSearch = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
};

const getCityWeather = function (city) {
    const apiKey = "593c1929abed320b8081e98e1d74384f"
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayWeather(data, city);
            });
        });
};

const displayWeather = function (weather, searchCity) {
    //TO CLEAR OLD REQUESTS
    weatherContainerEl.textContent = "";
    citySearchInputEl.textContent = searchCity;


    //CRETATE CURRENT DATE
    const currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
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


    //SPAN TO HOLD WIND SPEED
    const windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item"

    // APPEND COINTAINERS
    weatherContainerEl.appendChild(temperatureEl);
    weatherContainerEl.appendChild(humidityEl);
    weatherContainerEl.appendChild(windSpeedEl);

    const lat = weather.coord.lat;
    const lon = weather.coord.lon;
    getUvIndex(lat, lon)
}
const getUvIndex = function (lat, lon) {
    const apiKey = "593c1929abed320b8081e98e1d74384f"
    const apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayUvIndex(data)
                // console.log(data)
            });
        });
}

const displayUvIndex = function (index) {
    const uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if (index.value <= 2) {
        uvIndexValue.classList = "favorable"
    } else if (index.value > 2 && index.value <= 8) {
        uvIndexValue.classList = "moderate "
    }
    else if (index.value > 8) {
        uvIndexValue.classList = "severe"
    };

    uvIndexEl.appendChild(uvIndexValue);

    //APPEND INDEX
    weatherContainerEl.appendChild(uvIndexEl);
}
const get5Day = function (city) {
    const apiKey = "593c1929abed320b8081e98e1d74384f"
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                display5Day(data);
            });
        });
};

const display5Day = function (weather) {
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    const forecast = weather.list;
    for (var i = 5; i < forecast.length; i = i + 8) {
        const dailyForecast = forecast[i];


        const forecastEl = document.createElement("div");
        forecastEl.classList = "card bg-primary text-light m-2";
        //console.log(dailyForecast)

        //CREATE DATE
        const forecastDate = document.createElement("h5")
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);

        //CREATE IMAGE
        const weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);

        //APPEND TO FORECAST CARD
        forecastEl.appendChild(weatherIcon);

        const forecastTempEl = document.createElement("span");
        forecastTempEl.classList = "card-body text-center";
        forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        forecastEl.appendChild(forecastTempEl);

        const forecastHumEl = document.createElement("span");
        forecastHumEl.classList = "card-body text-center";
        forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

        forecastEl.appendChild(forecastHumEl);

        // APPEND TO FIVE DAYS CONTAINER
        forecastContainerEl.appendChild(forecastEl);
    }

}

const pastSearch = function (pastSearch) {

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city", pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);
}


const pastSearchHandler = function (event) {
    const city = event.target.getAttribute("data-city")
    if (city) {
        getCityWeather(city);
        get5Day(city);
    }
}

// pastSearch();

cityFormEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);