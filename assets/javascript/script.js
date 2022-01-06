var getRepoIssues = function(repo) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=ee74d7c74e74e6fbcc878740bbff7545";
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          // displayIssues(data);
            console.log(response)
        });
      }
      else {
        console.log(response);
        alert("There was a problem with your request!");
      }
    });
  };

getRepoIssues();