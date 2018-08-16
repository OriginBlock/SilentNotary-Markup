$(() => {
	$(document).on('click', '.localization-list__list-title', function (e){
		e.preventDefault();
		$(this).parent().toggleClass('localization-list__list-item_open');
	});
	$(document).on('click', '.localization-list__open', function (e){
		e.preventDefault();
		var $t = $(this);
		$t.toggleClass('button_active');
		if ($t.hasClass('button_active')){
			$('.localization-list__list-item').addClass('localization-list__list-item_open');
		} else {
			$('.localization-list__list-item').removeClass('localization-list__list-item_open');
		};
	});
});
