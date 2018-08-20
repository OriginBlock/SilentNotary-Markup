$(() => {
	$(document).on('click', '.pack-list__top', function (e){
		e.preventDefault();
		$(this).parent().toggleClass('pack-list__item_open');
	});
});
