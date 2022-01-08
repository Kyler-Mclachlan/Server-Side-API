// setting up dom objects
var submitButtonEl = document.querySelector("#submit-button");
var cityInputEl = document.querySelector("#exampleCity");
var currentDivEl = document.querySelector("#current");
var cityHolder = document.querySelector("#cityHolder");

// local storage array
var count = 0;
var searchedCitiesArray = [];

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
     
}

var addUVIndex = function(data) {
    var uvindexEl = document.createElement("span");
    uvindexEl.textContent = ("UV Index " + data.current.uvi)
    currentDivEl.appendChild(uvindexEl);
}

var storeSearchedCities = function(stats){

    // create DOM elements
    var searchedCityContainer = document.createElement("button");
    searchedCityContainer.classList = "searched-cities";
    var searchedCityName = document.createElement("span");

    //assinging id for local storage
    searchedCityName.id = count;
    count++;
    console.log(count);
    console.log(searchedCityName)
    
    // appending inputs for DOM to html
    searchedCityName.textContent = stats.name;
    searchedCityContainer.appendChild(searchedCityName);
    cityHolder.appendChild(searchedCityContainer);

    // creating object for local storage and pushing to array
    var searchedCityNameObject = {cityName: stats.name, id: searchedCityName.id};
    searchedCitiesArray.push(searchedCityNameObject);
    console.log(searchedCitiesArray)
    SaveLocal();
}


var SaveLocal = function(){
    window.localStorage.setItem("searchedCitiesArray", JSON.stringify(searchedCitiesArray));
  }

var pullLocal = function(){
    savedCities = localStorage.getItem(searchedCitiesArray);
    console.log(savedCities);
    if (!savedCities){
        savedCities = [];
        return false;
    }
    savedCities = JSON.parse(savedCities);
    for (var i = 0; i < savedCities.length; i++){
        var searchedCityContainer = document.createElement("button");
        searchedCityContainer.classList = "searched-cities";
        var searchedCityName = document.createElement("span");

        searchedCityName.textContent = savedCities.cityName;
        console.log(savedCities);
        searchedCityContainer.appendChild(searchedCityName);
        cityHolder.appendChild(searchedCityContainer);
    }
}

pullLocal();

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
    var dayOnedate = data.list[7].dt_txt;
    var editedDayOneDate = dayOnedate.substring(0,10);
    FDFCdayOneDateEL.textContent = editedDayOneDate;

    // grabbing icon

    FDFCdayOneIconEL.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[7].weather[0].icon + "@2x.png")
    FDFCdayOneIconEL.classList = "weatherIcons";
    FDFCdayOneTempEL.textContent = "Temp: " + data.list[7].main.temp + " F";
    FDFCdayOneWindEL.textContent = "Wind: " + data.list[7].wind.speed + " MPH";
    FDFCdayOneHumidityEL.textContent = "Humidity: " + data.list[7].main.humidity + " %";

    // appending to day one html divs

     dayOneDateEl.appendChild(FDFCdayOneDateEL);
     dayOneIconEl.appendChild(FDFCdayOneIconEL);
     dayOneTempEl.appendChild(FDFCdayOneTempEL);
     dayOneWindEl.appendChild(FDFCdayOneWindEL);
     dayOneHumidityEl.appendChild(FDFCdayOneHumidityEL);

      // day TWO

    dayTwoDateEl.textContent = "";
    dayTwoIconEl.textContent = "";
    dayTwoTempEl.textContent = "";
    dayTwoWindEl.textContent = "";
    dayTwoHumidityEl.textContent = "";

    var FDFCdayTwoDateEL = document.createElement("span");
    var FDFCdayTwoIconEL = document.createElement("IMG");
    var FDFCdayTwoTempEL = document.createElement("span");
    var FDFCdayTwoWindEL = document.createElement("span");
    var FDFCdayTwoHumidityEL = document.createElement("span");

   
    // cleaning date
    var dayTwodate = data.list[15].dt_txt;
    var editedDayTwoDate = dayTwodate.substring(0,10);
    FDFCdayTwoDateEL.textContent = editedDayTwoDate;

    // grabbing icon

    FDFCdayTwoIconEL.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[15].weather[0].icon + "@2x.png")
    FDFCdayTwoIconEL.classList = "weatherIcons";
    FDFCdayTwoTempEL.textContent = "Temp: " + data.list[15].main.temp + " F";
    FDFCdayTwoWindEL.textContent = "Wind: " + data.list[15].wind.speed + " MPH";
    FDFCdayTwoHumidityEL.textContent = "Humidity: " + data.list[15].main.humidity + " %";

    // appending to day one html divs

     dayTwoDateEl.appendChild(FDFCdayTwoDateEL);
     dayTwoIconEl.appendChild(FDFCdayTwoIconEL);
     dayTwoTempEl.appendChild(FDFCdayTwoTempEL);
     dayTwoWindEl.appendChild(FDFCdayTwoWindEL);
     dayTwoHumidityEl.appendChild(FDFCdayTwoHumidityEL);

    // day Three

    dayThreeDateEl.textContent = "";
    dayThreeIconEl.textContent = "";
    dayThreeTempEl.textContent = "";
    dayThreeWindEl.textContent = "";
    dayThreeHumidityEl.textContent = "";

    var FDFCdayThreeDateEL = document.createElement("span");
    var FDFCdayThreeIconEL = document.createElement("IMG");
    var FDFCdayThreeTempEL = document.createElement("span");
    var FDFCdayThreeWindEL = document.createElement("span");
    var FDFCdayThreeHumidityEL = document.createElement("span");

   
    // cleaning date
    var dayThreedate = data.list[23].dt_txt;
    var editedDayThreeDate = dayThreedate.substring(0,10);
    FDFCdayThreeDateEL.textContent = editedDayThreeDate;

    // grabbing icon

    FDFCdayThreeIconEL.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[23].weather[0].icon + "@2x.png")
    FDFCdayThreeIconEL.classList = "weatherIcons";
    FDFCdayThreeTempEL.textContent = "Temp: " + data.list[23].main.temp + " F";
    FDFCdayThreeWindEL.textContent = "Wind: " + data.list[23].wind.speed + " MPH";
    FDFCdayThreeHumidityEL.textContent = "Humidity: " + data.list[23].main.humidity + " %";
    
    // appending to day one html divs

     dayThreeDateEl.appendChild(FDFCdayThreeDateEL);
     dayThreeIconEl.appendChild(FDFCdayThreeIconEL);
     dayThreeTempEl.appendChild(FDFCdayThreeTempEL);
     dayThreeWindEl.appendChild(FDFCdayThreeWindEL);
     dayThreeHumidityEl.appendChild(FDFCdayThreeHumidityEL);

    // day Four

    dayFourDateEl.textContent = "";
    dayFourIconEl.textContent = "";
    dayFourTempEl.textContent = "";
    dayFourWindEl.textContent = "";
    dayFourHumidityEl.textContent = "";

    var FDFCdayFourDateEL = document.createElement("span");
    var FDFCdayFourIconEL = document.createElement("IMG");
    var FDFCdayFourTempEL = document.createElement("span");
    var FDFCdayFourWindEL = document.createElement("span");
    var FDFCdayFourHumidityEL = document.createElement("span");

   
    // cleaning date
    var dayFourdate = data.list[31].dt_txt;
    var editedDayFourDate = dayFourdate.substring(0,10);
    FDFCdayFourDateEL.textContent = editedDayFourDate;

    // grabbing icon

    FDFCdayFourIconEL.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[31].weather[0].icon + "@2x.png")
    FDFCdayFourIconEL.classList = "weatherIcons";
    FDFCdayFourTempEL.textContent = "Temp: " + data.list[31].main.temp + " F";
    FDFCdayFourWindEL.textContent = "Wind: " + data.list[31].wind.speed + " MPH";
    FDFCdayFourHumidityEL.textContent = "Humidity: " + data.list[31].main.humidity + " %";
    
    // appending to day one html divs

     dayFourDateEl.appendChild(FDFCdayFourDateEL);
     dayFourIconEl.appendChild(FDFCdayFourIconEL);
     dayFourTempEl.appendChild(FDFCdayFourTempEL);
     dayFourWindEl.appendChild(FDFCdayFourWindEL);
     dayFourHumidityEl.appendChild(FDFCdayFourHumidityEL);

    // day Five

    dayFiveDateEl.textContent = "";
    dayFiveIconEl.textContent = "";
    dayFiveTempEl.textContent = "";
    dayFiveWindEl.textContent = "";
    dayFiveHumidityEl.textContent = "";

    var FDFCdayFiveDateEL = document.createElement("span");
    var FDFCdayFiveIconEL = document.createElement("IMG");
    var FDFCdayFiveTempEL = document.createElement("span");
    var FDFCdayFiveWindEL = document.createElement("span");
    var FDFCdayFiveHumidityEL = document.createElement("span");

   
    // cleaning date
    var dayFivedate = data.list[39].dt_txt;
    var editedDayFiveDate = dayFivedate.substring(0,10);
    FDFCdayFiveDateEL.textContent = editedDayFiveDate;

    // grabbing icon

    FDFCdayFiveIconEL.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[39].weather[0].icon + "@2x.png")
    FDFCdayFiveIconEL.classList = "weatherIcons";
    FDFCdayFiveTempEL.textContent = "Temp: " + data.list[39].main.temp + " F";
    FDFCdayFiveWindEL.textContent = "Wind: " + data.list[39].wind.speed + " MPH";
    FDFCdayFiveHumidityEL.textContent = "Humidity: " + data.list[39].main.humidity + " %";
    
    // appending to day one html divs

     dayFiveDateEl.appendChild(FDFCdayFiveDateEL);
     dayFiveIconEl.appendChild(FDFCdayFiveIconEL);
     dayFiveTempEl.appendChild(FDFCdayFiveTempEL);
     dayFiveWindEl.appendChild(FDFCdayFiveWindEL);
     dayFiveHumidityEl.appendChild(FDFCdayFiveHumidityEL);


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