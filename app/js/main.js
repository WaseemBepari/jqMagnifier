;
(function ($, window, document, undefined) {
 
    var defaults = {
        color: "red"
    };
 
    function Plugin(element, options) {
 
        this.el = element;
        this.options = $.extend({}, defaults, options);
        
        this.init();
        
        return this;
    }
 
    Plugin.prototype.init = function () {
        $(this.el).css('color', this.options.color);
        
        var _divHeight = 0,
        	_divWidth = 0,
        	_mousePoint = {

        	}

    };
 
    $.fn.magnifier = function (options) {
        return this.each(function () {
            if (!$.data(this, 'magnifier')) {
                $.data(this, 'magnifier', new Plugin(this, options));
            }
        });
    };
 
})(jQuery, window, document);
