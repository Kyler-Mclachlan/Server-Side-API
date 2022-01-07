var cityHolderEl = document.querySelector("#city-holder");

var getCity = function(repo) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=ee74d7c74e74e6fbcc878740bbff7545";
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            console.log(data)
            
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
        var cityNameEl = document.createElement("span");
        cityNameEl.textContent = stats.name;
        console.log(cityNameEl)   
}
cityHolderEl.addEventListener("submit-button", getCity);
// getCity();