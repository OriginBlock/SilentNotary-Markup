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
	$("#info-dock").click(function() {
		$('.info1').toggle();
	});
	$(document).on('click', function(e) {
		if (!$(e.target).closest("#ifno-content").length) {
			$('.info1').hide();
		}
		e.stopPropagation();
	});
});

jQuery(document).ready(function($){
	$("#info-dock2").click(function() {
		$('.info2').toggle();
	});
	$(document).on('click', function(e) {
		if (!$(e.target).closest("#info-balance").length) {
			$('.info2').hide();
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
	$('.top-table ul').on('click', 'li.curent:not(.active)', function() {
		$(this)
		.addClass('active').siblings().removeClass('active')
	});
});
