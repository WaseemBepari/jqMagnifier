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
            var $div = $('<div class="glass"></div>');
                _ui.glass = $($div);
                $('body').append($div);
        }

        var mouseMove = function(e){
            var $el = $(this);
            var _zoomPos = _bgImg.offset();
            _mousePoint.x = e.pageX - _zoomPos.left;
            _mousePoint.y = e.pageY - _zoomPos.top;

            if ( _mousePoint.x < _bgImg.width() && _mousePoint.y < _bgImg.height() && _mousePoint.x > 0 && _mousePoint.y > 0) {
              zoomify(e);
            }
            else {
              _ui.glass.fadeOut(100);
            }

            return;

        };

        var zoomify = function(e){
            var _posX = Math.round(_mousePoint.x / _bgImg.width() * _defaultHeight - _ui.glass.width() /2 ) * -1,
                _posY = Math.round(_mousePoint.y / _bgImg.height() * _defaultWidth - _ui.glass.height() / 2) * -1,
                _bgImgPos = _posX + "px " + _posY + "px",
                _glass_left = e.pageX - _ui.glass.width() / 2,
                _glass_top  = e.pageY - _ui.glass.height() / 2;

                _ui.glass.css({
                  left: _glass_left,
                  top: _glass_top,
                  backgroundPosition: _bgImgPos
                });

            return;
        };

        $('.zoom').on('mousemove', function() {
                _ui.glass.fadeIn(200);
                _bgImg = $(this);

                var large_img_loaded = _bgImg.data('large-img-loaded');
                var src = _bgImg.data('large') || _bgImg.attr('src');

                if (src) {
                  _ui.glass.css({
                    'background-image': 'url(' + src + ')',
                    'background-repeat': 'no-repeat'
                  });
                }

                if(!_bgImg.data('_defaultWidth')){
                    var newImage = new Image();

                    newImage.onload = function() {
                        _defaultHeight = newImage.height;
                        _defaultWidth = newImage.width;

                        _bgImg.data('_defaultHeight', _defaultHeight);
                        _bgImg.data('_defaultWidth', _defaultWidth);

                        mouseMove.apply(this, arguments);

                        _ui.glass.on('mousemove', mouseMove);
                    };

                    newImage.src = src;
        
                    return;
                }else {

                _defaultHeight = _bgImg.data('_defaultHeight');
                _defaultWidth = _bgImg.data('_defaultWidth');

              }

              mouseMove.apply(this, arguments);
              _ui.glass.on('mousemove', mouseMove);
            });

            
        };
 
    $.fn.magnifier = function (options) {
        return this.each(function () {
            if (!$.data(this, 'magnifier')) {
                $.data(this, 'magnifier', new Plugin(this, options));
            }
        });
    };
 
})(jQuery, window, document);
