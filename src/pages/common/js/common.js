jQuery(document).ready(function($) {
	var sticky = new Sticky('.sidebar ul');
});

jQuery(document).ready(function($){
	$("button.share").click(function() {
		$('.popupp-user').toggle();
	});
	$(document).on('click', function(e) {
		if (!$(e.target).closest(".user").length) {
			$('.popupp-user').hide();
		}
		e.stopPropagation();
	});
});

jQuery(document).ready(function($){
	$(".shape-icon").click(function() {
		$('.shape-dop').toggle();
	});
	$(document).on('click', function(e) {
		if (!$(e.target).closest(".shape").length) {
			$('.shape-dop').hide();
		}
		e.stopPropagation();
	});
});

jQuery(document).ready(function($){
	$('select').styler();
});

jQuery(document).ready(function($){

	var pathname_url = window.location.pathname;
	var href_url = window.location.href;

	$('.sidebar ul li').each(function () {
		var link = $(this).find('a').attr('href');

		if (pathname_url == link || href_url == link) {
			$(this).addClass('current');
		}
	});

});

jQuery(document).ready(function($){
	var $menu = $("#my-menu");
	$menu.mmenu({
		extensions: [ 'widescreen', 'effect-menu-slide', 'pagedim-black' ],
		navbar: {
			title: '<img src="/common/image/logo.svg" alt="Silent Notary">'
		},
		offCanvas: {
			position  : 'right'
		}
	});
	var $icon = $(".hamburger");
	var API = $menu.data("mmenu");

	$icon.on("click", function () {
		API.open();
	});
	API.bind( "open:finish", function() {
		setTimeout(function() {
			$icon.addClass( "is-active" );
		}, 30);
	});
	API.bind( "close:finish", function() {
		setTimeout(function() {
			$icon.removeClass( "is-active" );
		}, 30);
	});
});
