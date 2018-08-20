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
	$(".dock-file").unbind('click').click(function(e) {
		if ( !$(e.target).hasClass('.checkbox') && $(e.target).parents('.checkbox').length === 0 ){
			$(this).find(".item-dock-12").slideToggle('fast');
		}
	});
});

jQuery(document).ready(function($){
	$('.top-table ul').on('click', 'li.curent:not(.active)', function() {
		$(this)
		.addClass('active').siblings().removeClass('active')
	});
});

jQuery(document).ready(function($){
  $('input[name="datefilter"]').daterangepicker({
      autoUpdateInput: false,
      locale: {
          cancelLabel: 'Очистить',
          applyLabel: 'Применить',
      }
  });
  $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
  });
  $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
  });
});