(function($) {

	'use strict';

	var images = [
		{
			name: 'two.jpg',
			points: [923,918,923+50,918+50]
		},
		{
			name: 'three.jpg',
			points: [31,1892,31+50,1892+50]
		},
		{
			name: 'four.jpg',
			points: [1787,1846,1787+50,1846+50]
		},
		{
			name: 'two.jpg',
			points:[923,918,923,918]
		}
	]

	$(document).on('ready', function() {

		var image = images[2];

		$('#image').attr('src', 'photos/' + image.name);

		$('#container').focusTrack({
			bindToResize: true,
			targetBox:  image.points
		});

		$('.grid-viewport').click(function() {
			var $this = $(this);
			$this.append($('#image').detach());
			$('#container').attr('id', '');
			$this.attr('id', 'container');
			$('#container').focusTrack({
				bindToResize: true,
				targetBox: image.points
			});
		})
		// FocusTrack({
		// 	image: '#image',
		// 	container: '#container',
		// 	targetBox: [1500,1080,1920,500]
		// }).focus();
	});



})(jQuery);
