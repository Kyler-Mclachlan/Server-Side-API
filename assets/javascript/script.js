var submitButtonEl = document.querySelector("#submit-button");
var cityInputEl = document.querySelector("#exampleCity");
var currentDivEl = document.querySelector("#current");
var cityHolder = document.querySelector("#cityHolder");
var clickedSubmit = function(event){
    event.preventDefault();

    var city = cityInputEl.value.trim();
    
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ee74d7c74e74e6fbcc878740bbff7545";
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            console.log(data)
            console.log(city)
            listCityConditions(data);
            storeSearchedCities(data);
        });
      }
      else {
        console.log(response);
        alert("There was a problem with your request!");
      }
    });
  };

var listCityConditions = function(stats){
    // add code here to check if city exists
    var cityContainer = document.createElement("div");;
    var cityNameEl = document.createElement("span");
    cityNameEl.textContent = stats.name;
    cityContainer.appendChild(cityNameEl);
    currentDivEl.appendChild(cityContainer);
    console.log(cityNameEl);  
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





submitButtonEl.addEventListener("click", clickedSubmit);

// getCity();