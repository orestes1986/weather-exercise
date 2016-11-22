function addToFav() {
//   console.log("Hello from add to fav!!!");
  var title=document.title; // gets the title
  var url=document.location; // ..and the URL of the site
    try {
      window.external.addFavorite(url, title);
      document.getElementById("favourites-heart").src = "./imgs/big-heart.svg";
    } catch (e) {
//       console.log("window.external.addFavorite ERROR: "+e);
      try {
	window.sidebar.addPanel(title, url, '');
	document.getElementById("favourites-heart").src = "./imgs/big-heart.svg";
      } catch (e) {
// 	console.log("window.sidebar.addPanel ERROR: "+e);
	try {
	  external.AddToFavoritesBar(url, title, '');
	  document.getElementById("favourites-heart").src = "./imgs/big-heart.svg";
	} catch (e) {
// 	  console.log("external.AddToFavoritesBar ERROR: "+e);
	  alert("Please try shortcut Ctrl+D to add to favorite");
	  document.getElementById("favourites-heart").src = "./imgs/heart.svg"
	}
      }
    }
  return false;
}