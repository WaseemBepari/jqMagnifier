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

        //change bg Pos
        var magnifier = function () {
            var _zoomWidth = Math.round(_mousePoint.x / _bgImg.width() * _defaultHeight - _ui.glass.width() / 2) * -1,
                _zoomHeight = Math.round(_mousePoint.y / _bgImg.height() * _defaultHeight - _ui.glass.height() / 2) * -1,
                _bgabsPos = _zoomWidth + "px" + _zoomHeight + "px",
                _zoomLeft = (e).page.x - _ui.glass.width() / 2,
                _zoomTop = (e).page.y - _ui.glass.height()  / 2;

                _ui.glass.css({
                    left: _zoomLeft,
                    top: _zoomTop,
                    backgroundPosition: bg_pos
                });

                return;
        }

        $(".zoom").on("mousemove", function(){
            _ui.glass.fadeOut(100);

                _bgImg = $(this);

            var _lgImg = _bgImg.data(".magnied_img"),
                _src = _bgImg.data("large") || _bgImg.attr("src");

                if(src){
                    _ui.glass.css({
                        'background-image': 'url(' + src + ')',
                        'background-repeat': 'no-repeat'
                    });
                }

                if(!_bgImg.data("_defaultWidth")){
                    var newImage = new Image();

                    newImage.onload = function(){
                        _defaultHeight = newImage.height;
                        _defaultWidth = newImage.width;

                        _bgImg.data("_defaultheight", _defaultheight);
                        _bgImg.data("_defaultWidth", _defaultWidth);

                        mouseMove.apply(this, arguments);

                        _ui.glass.on('mousemove', mouseMove);

                        newImage.src = src;

                        return;
                    }
                }else{
                    
                }

        });
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
