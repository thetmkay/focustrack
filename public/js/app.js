(function($) {

	'use strict';

	function _FocusTrack(options) {
		var _defaults = {
			image: '',
			container: '',
			//targetPoint: [0,0,0,0],
			//targetBox: [0,0,0,0],
			bindToResize: false
		},
		self = this;

		options = $.extend(_defaults, options);
		self._image = options.image;
		self._container = options.container;

		if(options.targetPoint) {
			self.focus = self._pointFocus;
			self._coords = options.targetPoint;
		}
		else if(options.targetBox) {
			self.focus = self._boxFocus;
			self._coords = self._normalize(options.targetBox);
		}
		else {
			self.focus = self._pointFocus;
			self._coords = self._findCenter(self._image);
		}

		if(options.bindToResize) {
			self._bind();
		}
		// this._initImage();
		// this._initContainer();
	};

	_FocusTrack.prototype = {
		_midpoint: function(x,y) {
			return (x + y)/2;
		},
		_initImage: function() {
			var $image = $(this._image);
			this._imageWidth = $image.width();
			this._imageHeight = $image.height();
		},
		_initContainer: function() {
			var $container = $(this._container);
			this._containerWidth = $container.width();
			this._containerHeight = $container.height();
		},
		_bindToResize: function() {
			this.focusOnEvent($(window).resize);
		},
		focusOnEvent:  function(eventFn) {
			var _this = this;
			eventFn(function(event) {
				_this.focus();
			});
		},
		_findCenter: function(selector) {
			var $elem = $(selector),
				x = this.midpoint(0,$elem.width()),
				y = this.midpoint(0,$elem.height());

			return [x,y];
		},
		_normalize: function(points) {
			var coords = [];
			coords.push(Math.min(points[0], points[2]));
			coords.push(Math.min(points[1], points[3]));
			coords.push(Math.max(points[0], points[2]));
			coords.push(Math.max(points[1], points[3]));
			return coords;
		},
		_boxDisplacement: function(imageDimension, containerDimension, x, y) {
			var shift = 0;

			if(imageDimension > containerDimension) {

				var container_mid = (containerDimension)/2,
					target_mid = this._midpoint(x,y);

				if(target_mid < container_mid)
					shift = 0;
				else if (imageDimension - target_mid < container_mid)
					shift = containerDimension - imageDimension;
				else
					shift = container_mid - target_mid;
			}

			return shift;
		},
		_boxFocus: function() {
			this._initImage();
			this._initContainer();
			var left_shift = this._boxDisplacement(this._imageWidth, this._containerWidth, this._coords[0], this._coords[2]),
				top_shift = this._boxDisplacement(this._imageHeight, this._containerHeight, this._coords[0], this._coords[2]);

			this.track(left_shift, top_shift);
		},
		_pointFocus: function() {
			this._initImage();
			this._initContainer();
		},
		track: function(left, top) {
			console.log(left);
			console.log(top);
			$(this._image).css({
				'left': left,
				'top':top
			});
		}
	};

	function FocusTrack(options) {
		return new _FocusTrack(options);
	};

	function jqueryFocusTrack(options) {
		var _options = {
			'container': this.selector
		};
		options = $.extend(_options,options);
		FocusTrack(options).focus();
		return this;
	};

	$.fn.focusTrack = jqueryFocusTrack;

	$(document).on('ready', function() {
		$('#container').focusTrack({
			image: '#image',
			targetBox: [1500,1080,1920,500]
		});
		// FocusTrack({
		// 	image: '#image',
		// 	container: '#container',
		// 	targetBox: [1500,1080,1920,500]
		// }).focus();
	});


})(jQuery);
