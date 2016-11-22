function getForcast(latitudeORcity="", longitude="") {
  if (latitudeORcity != "") { //checkes if there is at least one value
//     console.log("hey getForcastWCoords");
    if (window.XMLHttpRequest) {
      //code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttpWeather = new XMLHttpRequest();
      xmlhttpForcast = new XMLHttpRequest();
    } else {
      //code for IE6, IE5
      xmlhttpWeather = new ActiveXObject("Microsoft.XMLHTTP");
      xmlhttpForcast = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttpWeather.onreadystatechange = function() {
      if (xmlhttpWeather.readyState == 4 && xmlhttpWeather.status == 200) { //once there is a responce about the weather, then a request for the forcast is sent
	///
	var jsonWeatherObj = JSON.parse(xmlhttpWeather.responseText);
// 	console.log("hey Weather");
	xmlhttpForcast.onreadystatechange = function() {
	  if (xmlhttpForcast.readyState == 4 && xmlhttpForcast.status == 200) {
	    ///
	    var jsonForcastObj = JSON.parse(xmlhttpForcast.responseText);
// 	    console.log("hey Forcast");
	    draWeather(jsonWeatherObj, jsonForcastObj);
	  }
	};
	if(longitude == "") { // if there is only one value, the request sends for a city (forcast)
	  var forcastRef = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+latitudeORcity+"&appid=ff0a2bed6e12b56ad038104b5cac2e46&units=metric&cnt=5";
	} else { // otherwise, it sends for coords (forcast)
	  var forcastRef = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+latitudeORcity+"&lon="+longitude+"&appid=ff0a2bed6e12b56ad038104b5cac2e46&units=metric&cnt=5";
	}
	xmlhttpForcast.open("GET",forcastRef,true);
	xmlhttpForcast.send();
      }
    };
    if(longitude == "") { // again if there is only one value, the request sends for a city (weather)
	  
      var weatherRef = "http://api.openweathermap.org/data/2.5/weather?q="+latitudeORcity+"&appid=ff0a2bed6e12b56ad038104b5cac2e46&units=metric";
    } else { // again otherwise, it sends for coords (weather)
      var weatherRef = "http://api.openweathermap.org/data/2.5/weather?lat="+latitudeORcity+"&lon="+longitude+"&appid=ff0a2bed6e12b56ad038104b5cac2e46&units=metric";
    }
    xmlhttpWeather.open("GET",weatherRef,true);
    xmlhttpWeather.send();
  }
}
function draWeather(jsonWeatherObj, jsonForcastObj) {
  var weatherArr = [ // array to store each possible responce to an icon
  {code:"01d",  icon: "2.svg"},
  {code:"02d",  icon: "8.svg"},
  {code:"03d",  icon: "14.svg"},
  {code:"04d",  icon: "25.svg"},
  {code:"09d",  icon: "18.svg"},
  {code:"10d",  icon: "17.svg"},
  {code:"11d",  icon: "27.svg"},
  {code:"13d",  icon: "23.svg"},
  {code:"50d",  icon: "6.svg"},
  
  {code:"01n",  icon: "3.svg"},
  {code:"02n",  icon: "9.svg"},
  {code:"03n",  icon: "14.svg"},
  {code:"04n",  icon: "25.svg"},
  {code:"09n",  icon: "18.svg"},
  {code:"10n",  icon: "17.svg"},
  {code:"11n",  icon: "27.svg"},
  {code:"13n",  icon: "23.svg"},
  {code:"50n",  icon: "6.svg"}
  ];
  var week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; // array to match date to day's shortened name
  var weatherExp = '<p class="css-day" id="today-label">TODAY </p>';
  $('body').addClass('weathered');
  weatherExp += '<p class="css-city" id="today-city">'+jsonWeatherObj.name+', '+jsonWeatherObj.sys.country+'</p>';
  for (var i = 0; i < weatherArr.length; i++) {
    if(weatherArr[i].code == jsonWeatherObj.weather[0].icon){
      weatherExp += '<img src="./imgs/meteo/'+weatherArr[i].icon+'" /> <br />';
    }
  }
  weatherExp += '<p class="css-tempratures css-today-tempratures css-max-tempratures" id="today-max-tempratures">'+jsonWeatherObj.main.temp_max + ' °C </p>';
  weatherExp += '<p class="css-tempratures css-today-tempratures css-min-tempratures" id="today-min-tempratures">'+jsonWeatherObj.main.temp_min + ' °C </p>';
  document.getElementById("weather-today").innerHTML = weatherExp;
  var d0 = new Date();
  var d1 = new Date();
  var forcastExp = "";
  for (var j = 0; j < jsonForcastObj.list.length; j++) {
    d1.setDate(d0.getDate()+1+j);
//     console.log("d1: "+week[d1.getDay()]);
    forcastExp = '<p class="css-day css-weekday">'+week[d1.getDay()]+'</p>';
    for (var i = 0; i < weatherArr.length; i++) {
      if(weatherArr[i].code == jsonForcastObj.list[j].weather[0].icon){
	forcastExp += '<img src="./imgs/meteo/'+weatherArr[i].icon+'" /> <br />';
      }
    }
    forcastExp += '<p class="css-tempratures css-weekday-tempratures css-max-tempratures" id="weekday-max-tempratures">'+jsonForcastObj.list[j].temp.max + ' °C </p>';
    forcastExp += '<p class="css-tempratures css-weekday-tempratures css-min-tempratures" id="weekday-min-tempratures">'+jsonForcastObj.list[j].temp.min + ' °C </p>';
  document.getElementsByClassName("css-display-forcast")[j].innerHTML = forcastExp;
  }
}