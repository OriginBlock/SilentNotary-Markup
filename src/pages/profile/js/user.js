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