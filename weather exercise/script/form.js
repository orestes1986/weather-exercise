function accessLocation() { // a method to get user's location
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function init() { // method called by Google maps
    var input = document.getElementById('locationType');
    var autocomplete = new google.maps.places.Autocomplete(input);
}
google.maps.event.addDomListener(window, 'load', init); // when DOM loads this runs
function showPosition(position) { 
  getForcast(position.coords.latitude, position.coords.longitude); // get the weather and the forcast
}
function searchLocation() {
//   console.log("Hey from searchLocation!!");
//   var loc = document.getElementById("locationForm").elements["locationType"].value;
  var loc = document.getElementById("locationType").value; 
  getForcast(loc); // get the weather and the forcast
//   console.log(loc);
}
function checKey(){ // fix to prevent return key from triggering access location
//   console.log("Hey from checKey!!");
  init();
  if(event.keyCode == 13) {
    searchLocation();
  }
  return event.keyCode != 13;
}