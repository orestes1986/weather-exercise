$( window ).on('load', function()  { // when whole page loads
  for (var i = 0; i < document.getElementsByClassName("js-social-link").length; i++){ // fixes links to current page
    document.getElementsByClassName("js-social-link")[i].href += document.location;
  }
//   console.log(document.location.href);
  if (!(document.location.href.includes("?body=loaded"))){ // checks if I return from a link
    setTimeout(function(){
      $('body').addClass('loaded'); // this adds the loaded class to the body 2 seconds after the page has loaded, so that the loader will leave 
    }, 2000); // these 2 secs give a sence of loading even when it doesn't rely takes that long
  } else {
      $('body').addClass('loaded');
  }
});