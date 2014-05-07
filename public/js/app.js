(function($) {

	$(document).on('ready', function() {

		var midpoint = function (x1,x2) {
			return (x1 + x2)/2;
		};

		var calcPos =  function() {
			// var coord = {
			// 	x1: 398,
			// 	x2: 789,
			// 	y1: 608,
			// 	y2: 980
			// },
			var coord = {
				x1: 1500,
				x2: 1920,
				y1: 1080,
				y2: 500,
			},
				c = [],
				$img = $('img'),
				$container = $img.parent();
				//img = new Image();

			c.push(Math.min(coord.x1, coord.x2));
			c.push(Math.min(coord.y1, coord.y2));
			c.push(Math.max(coord.x1, coord.x2));
			c.push(Math.max(coord.y1, coord.y2));

			console.log(c);
			//img.src = 'photos/test.jpg';

			var i_width = $img.width(),
				i_height = $img.height(),
				c_width = $container.width(),
				c_height = $container.height();
				// g_width = Math.abs(coord.x1 - coord.x2),
				// g_height = Math.abs(coord.y1 - coord.y2);

			console.log($img);
			console.log($container.width());
			console.log($container.height());
			console.log($img.width());
			console.log($img.height());

			var left = 0,
				top = 0;

			if(i_width > c_width) {

				var c_mid = (c_width)/2,
					g_mid = midpoint(coord.x1,coord.x2);



				if(g_mid < c_mid)
					left = 0
				else if (i_width - g_mid < c_mid)
					left = c_width - i_width
				else
					left = c_mid - g_mid;

			}

			if(i_height > c_height) {
				var c_mid = c_height/2,
					g_mid = midpoint(coord.y1,coord.y2);

				console.log('g_mid ' + g_mid);
				console.log('c_mid ' + c_mid);

				if(g_mid < c_mid)
					top = 0
				else if (i_height - g_mid < c_mid)
					top = c_height - i_height
				else
					top = c_mid - g_mid;

			}

			console.log(left);
			console.log(top);

			$img.css({
				'left': left,
				'top': top
			});

		};
		//console.log($img.style.backgroundImage);
		$(window).on('load', calcPos);
		$(window).on('resize', calcPos);
	});


})(jQuery);
