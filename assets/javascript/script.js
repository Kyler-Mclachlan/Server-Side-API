// setting up dom objects
var submitButtonEl = document.querySelector("#submit-button");
var cityInputEl = document.querySelector("#exampleCity");
var currentDivEl = document.querySelector("#current");
var cityHolder = document.querySelector("#cityHolder");

// five day forecast elements

//day One
var dayOneParent = document.querySelector("#dayOne");
var dayOneDateEl = document.querySelector("#dayOneDate");
var dayOneIconEl = document.querySelector("#dayOneIcon");
var dayOneTempEl = document.querySelector("#dayOneTemp");
var dayOneWindEl = document.querySelector("#dayOneWind");
var dayOneHumidityEl = document.querySelector("#dayOneHumidity");

// day two
var dayTwoDateEl = document.querySelector("#dayTwoDate");
var dayTwoIconEl = document.querySelector("#dayTwoIcon");
var dayTwoTempEl = document.querySelector("#dayTwoTemp");
var dayTwoWindEl = document.querySelector("#dayTwoWind");
var dayTwoHumidityEl = document.querySelector("#dayTwoHumidity");

// day three
var dayThreeDateEl = document.querySelector("#dayThreeDate");
var dayThreeIconEl = document.querySelector("#dayThreeIcon");
var dayThreeTempEl = document.querySelector("#dayThreeTemp");
var dayThreeWindEl = document.querySelector("#dayThreeWind");
var dayThreeHumidityEl = document.querySelector("#dayThreeHumidity");

// day four

var dayFourDateEl = document.querySelector("#dayFourDate");
var dayFourIconEl = document.querySelector("#dayFourIcon");
var dayFourTempEl = document.querySelector("#dayFourTemp");
var dayFourWindEl = document.querySelector("#dayFourWind");
var dayFourHumidityEl = document.querySelector("#dayFourHumidity");

// day five

var dayFiveDateEl = document.querySelector("#dayFiveDate");
var dayFiveIconEl = document.querySelector("#dayFiveIcon");
var dayFiveTempEl = document.querySelector("#dayFiveTemp");
var dayFiveWindEl = document.querySelector("#dayFiveWind");
var dayFiveHumidityEl = document.querySelector("#dayFiveHumidity");

var clickedSubmit = function(event){
    event.preventDefault();

    var city = cityInputEl.value.trim();
    
    // format the github api url
    var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ee74d7c74e74e6fbcc878740bbff7545";
    // make a get request to url
    fetch(currentWeatherAPI).then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            console.log(data)
            console.log(city)
            listCityConditions(data);
            storeSearchedCities(data);
            oneCallAPI(data);
            fiveDayForecastAPICall(data);
        });
      }
      else {
        console.log(response);
        alert("There was a problem with your request!");
      }
    });
  };

var listCityConditions = function(stats){
    currentDivEl.textContent = "";
    // add code here to check if city exists
    var cityNameEl = document.createElement("span");

    // converting time
    const unixTime = stats.dt;
    const date = new Date(unixTime*1000);
    var formatedDate = date.toLocaleDateString();
    
    // creating DOM elements
    var tempEl = document.createElement("span");
    var windEl = document.createElement("span");
    var humidityEl = document.createElement("span");
    var currentWeatherIcon = document.createElement("IMG");

    // creating icon
    currentWeatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + stats.weather[0].icon + "@2x.png")
    currentWeatherIcon.classList = "weatherIcons";

    // adding content to created DOM elements
    cityNameEl.textContent = (stats.name + " " + "(" + formatedDate + ")");
    tempEl.textContent = ("Temp " + stats.main.temp + "F");
    windEl.textContent = ("Wind " + stats.wind.speed + " MPH")
    humidityEl.textContent = ("Humidity " + stats.main.humidity + " %")
    cityNameEl.id = "currentDate";

    // appending DOM elements to HTML
    cityNameEl.appendChild(currentWeatherIcon);
    currentDivEl.appendChild(cityNameEl);
    currentDivEl.appendChild(tempEl);
    currentDivEl.appendChild(windEl);
    currentDivEl.appendChild(humidityEl);
    console.log(cityNameEl);  
}

var addUVIndex = function(data) {
    var uvindexEl = document.createElement("span");
    uvindexEl.textContent = ("UV Index " + data.current.uvi)
    currentDivEl.appendChild(uvindexEl);
}

var storeSearchedCities = function(stats){
    var searchedCityContainer = document.createElement("button");
    searchedCityContainer.classList = "searched-cities";
    var searchedCityName = document.createElement("span");
    // assign it an attribute with its city name, use that to search for the city
    searchedCityName.textContent = stats.name;
    searchedCityContainer.appendChild(searchedCityName);
    cityHolder.appendChild(searchedCityContainer);
}

var oneCallAPI = function(data) {
    var OCApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&dt=" + data.dt + "&exclude=hourly,daily&appid=ee74d7c74e74e6fbcc878740bbff7545";
    fetch(OCApi).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
        addUVIndex(data);
          });
        }
        else {
          console.log(response);
          alert("There was a problem with your request!");
        }
      });
}

var fiveDayForecast = function(data) {

     // day one

    dayOneDateEl.textContent = "";
    dayOneIconEl.textContent = "";
    dayOneTempEl.textContent = "";
    dayOneWindEl.textContent = "";
    dayOneHumidityEl.textContent = "";

    var FDFCdayOneDateEL = document.createElement("span");
    var FDFCdayOneIconEL = document.createElement("IMG");
    var FDFCdayOneTempEL = document.createElement("span");
    var FDFCdayOneWindEL = document.createElement("span");
    var FDFCdayOneHumidityEL = document.createElement("span");

   
    // cleaning date
    console.log(data);
    var dayOnedate = data.list[2].dt_txt;
    var editedDayOneDate = dayOnedate.substring(0,10);
    FDFCdayOneDateEL.textContent = editedDayOneDate;
    console.log(FDFCdayOneDateEL);

    // grabbing icon

    FDFCdayOneIconEL.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + "@2x.png")
    FDFCdayOneIconEL.classList = "weatherIcons";
    FDFCdayOneTempEL.textContent = "Temp: " + data.list[2].main.temp + " F";
    FDFCdayOneWindEL.textContent = "Wind: " + data.list[2].wind.speed + " MPH";
    FDFCdayOneHumidityEL.textContent = "Humidity: " + data.list[2].main.humidity + " %";

    // appending to day one html divs

     dayOneDateEl.appendChild(FDFCdayOneDateEL);
     dayOneIconEl.appendChild(FDFCdayOneIconEL);
     dayOneTempEl.appendChild(FDFCdayOneTempEL);
     dayOneWindEl.appendChild(FDFCdayOneWindEL);
     dayOneHumidityEl.appendChild(FDFCdayOneHumidityEL);
}

var fiveDayForecastAPICall = function(data){
    var forecastWeatherAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + data.name + "&units=imperial&appid=ee74d7c74e74e6fbcc878740bbff7545";
    fetch(forecastWeatherAPI).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
        fiveDayForecast(data);
          });
        }
        else {
          console.log(response);
          alert("There was a problem with your request!");
        }
      });
}






submitButtonEl.addEventListener("click", clickedSubmit);

// getCity();