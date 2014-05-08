(function($) {

	'use strict';

	$(document).on('ready', function() {
		$('#container').focusTrack({
			bindToResize: true,
			targetBox: [1500,1080,1920,500]
		});
		// FocusTrack({
		// 	image: '#image',
		// 	container: '#container',
		// 	targetBox: [1500,1080,1920,500]
		// }).focus();
	});



})(jQuery);
