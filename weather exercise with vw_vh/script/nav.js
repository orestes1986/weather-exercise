function toggleMenu(){
//   console.log("Hey from toggleMenu!!");
  if ($('.js-menu-call').hasClass( "css-menu-call-on" )) {
    $('.js-menu-call').removeClass('css-menu-call-on');
    $('.js-menu-call').addClass('css-menu-call-off');
    $(".js-side-menu").removeClass("css-side-menu-off");
    $('.js-side-menu').addClass('css-side-menu-on');
  } else {
    $('.js-menu-call').removeClass('css-menu-call-off');
    $('.js-menu-call').addClass('css-menu-call-on');
    $(".js-side-menu").removeClass("css-side-menu-on");
    $('.js-side-menu').addClass('css-side-menu-off');
  }
}
$(window).click(function() {
    if(!$(event.target).closest('.js-side-menu').length) {
      if(!$(event.target).closest('.js-menu-call').length) {
// 	console.log("Hey from closeMenu!!");
	if ($('.js-menu-call').hasClass( "css-menu-call-off" )) {
	  $('.js-menu-call').removeClass('css-menu-call-off');
	  $('.js-menu-call').addClass('css-menu-call-on');
	  $(".js-side-menu").removeClass("css-side-menu-on");
	  $('.js-side-menu').addClass('css-side-menu-off');
	}
      }
    }
});