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
        //$(this.el).css('color', this.options.color);
        
        var _defaultHeight = 0,
        	_defaultWidth = 0,
        	_mousePoint = {
                x : 0,
                y : 0
        	},
            _ui = {
               zoom : $('.zoom')
            },
            _zoomDiv,
            _bgImg;
            // Add the magnifying glass
        if (_ui.zoom.length) {
            var $div = $("<div class='glass'></div>");
                _ui.glass = $div;
                $('body').append($div);
        }

        var mousemove = function (e){
            var _zoomDiv = _bgImg.offset();

            _mousePoint.x = e.pageX - _zoomDiv.left();
            _mousePoint.y = e.pageY - _zoomDiv.top();

            if( _mousePoint.x < _bgImg.width && _mousePoint.y < _bgImg.height && _mousePoint.x > 0 && _mousePoint.y > 0){
                _zoomDiv(e);
            }else{
                _ui.glass.fadeOut(100);
            }
        }
        
        return;

        var magnifier = function () {
            
        }
    };

    Plugin.prototype.zoom = function () {
        var mousemove = $(this),
            mag

    }
 
    $.fn.magnifier = function (options) {
        return this.each(function () {
            if (!$.data(this, 'magnifier')) {
                $.data(this, 'magnifier', new Plugin(this, options));
            }
        });
    };
 
})(jQuery, window, document);
