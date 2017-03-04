function initMap() {
	var styles = [{
			'featureType': 'all',
			'elementType': 'labels',
			'stylers': [{
				'visibility': 'off'
			}]
		},
		{
			'featureType': 'administrative.locality',
			'elementType': 'labels.text.fill',
			'stylers': [{
				'color': '#5d7e62'
			}]
		},
		{
			'featureType': 'administrative.locality',
			'elementType': 'labels.text.stroke',
			'stylers': [{
				'visibility': 'off'
			}]
		},
		{
			'featureType': 'landscape.man_made',
			'elementType': 'geometry.fill',
			'stylers': [{
				'color': '#f8f8d6'
			}]
		},
		{
			'featureType': 'landscape.natural',
			'elementType': 'geometry',
			'stylers': [{
				'color': '#b3c67f'
			}]
		},
		{
			'featureType': 'poi',
			'elementType': 'all',
			'stylers': [{
				'visibility': 'off'
			}]
		},
		{
			'featureType': 'poi.school',
			'elementType': 'labels',
			'stylers': [{
				'visibility': 'on'
			}]
		},
		{
			'featureType': 'poi.sports_complex',
			'elementType': 'geometry',
			'stylers': [{
				'visibility': 'on'
			}]
		},
		{
			'featureType': 'poi.sports_complex',
			'elementType': 'geometry.fill',
			'stylers': [{
				'color': '#90a653'
			}]
		},
		{
			'featureType': 'road',
			'elementType': 'geometry.fill',
			'stylers': [{
					'hue': '#003bff'
				},
				{
					'saturation': '-100'
				},
				{
					'lightness': '100'
				}
			]
		},
		{
			'featureType': 'road',
			'elementType': 'geometry.stroke',
			'stylers': [{
					'color': '#808080'
				},
				{
					'lightness': '54'
				}
			]
		},
		{
			'featureType': 'road',
			'elementType': 'labels.text.fill',
			'stylers': [{
				'color': '#767676'
			}]
		},
		{
			'featureType': 'road',
			'elementType': 'labels.text.stroke',
			'stylers': [{
				'color': '#fbfbfb'
			}]
		},
		{
			'featureType': 'road.highway.controlled_access',
			'elementType': 'labels',
			'stylers': [{
				'visibility': 'on'
			}]
		},
		{
			'featureType': 'road.arterial',
			'elementType': 'labels',
			'stylers': [{
				'visibility': 'on'
			}]
		},
		{
			'featureType': 'transit',
			'elementType': 'labels',
			'stylers': [{
				'visibility': 'on'
			}]
		},
		{
			'featureType': 'water',
			'elementType': 'all',
			'stylers': [{
					'hue': '#0088ff'
				},
				{
					'saturation': '43'
				},
				{
					'lightness': '-11'
				}
			]
		},
		{
			'featureType': 'water',
			'elementType': 'labels',
			'stylers': [{
				'visibility': 'on'
			}]
		}
	];

	var image = document.getElementById('map-image');
	var el = document.getElementById('map');
	var center = {
		lat: parseFloat(el.getAttribute('data-lat')),
		lng: parseFloat(el.getAttribute('data-lng'))
	};

	var map = new google.maps.Map(el, {
		zoom: 14,
		center: center,
		disableDefaultUI: true,
		scrollwheel: false,
		zoomControl: true,
		styles: styles
	});
	var marker = new google.maps.Marker({
		position: center,
		map: map
	});
}
