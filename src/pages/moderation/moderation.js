/*!
 * jQuery Textarea AutoSize plugin
 * Author: Javier Julio
 * Licensed under the MIT license
 */
;(function ($, window, document, undefined) {

  var pluginName = "textareaAutoSize";
  var pluginDataName = "plugin_" + pluginName;

  var containsText = function (value) {
    return (value.replace(/\s/g, '').length > 0);
  };

  function Plugin(element, options) {
    this.element = element;
    this.$element = $(element);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var diff = parseInt(this.$element.css('paddingBottom')) +
                 parseInt(this.$element.css('paddingTop')) +
                 parseInt(this.$element.css('borderTopWidth')) +
                 parseInt(this.$element.css('borderBottomWidth')) || 0;


      if (containsText(this.element.value)) {
        this.$element.height(this.element.scrollHeight - diff + 3);
      }

      // keyup is required for IE to properly reset height when deleting text
      this.$element.on('input keyup', function(event) {
        var $window = $(window);
        var currentScrollPosition = $window.scrollTop();

        $(this)
          .height(0)
          .height(this.scrollHeight - diff + 3);

        $window.scrollTop(currentScrollPosition);
      });
    }
  };

  $.fn[pluginName] = function (options) {
    this.each(function() {
      if (!$.data(this, pluginDataName)) {
        $.data(this, pluginDataName, new Plugin(this, options));
      }
    });
    return this;
  };

})(jQuery, window, document);

$(document).ready(function(e){
	$('.moder-item__textarea').textareaAutoSize();
});

$(window).load(function (e) {
  var $el = $('.moder-item__line');
  console.log($el.height());
  if ($el.height() > 20){
    $el.addClass('moder-item__line_full');
  };
});