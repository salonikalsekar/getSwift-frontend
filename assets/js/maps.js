$( document ).ready( function() {

	// Google Maps JS
	// Set Map
	function initMap() {

	  var latLng = { lat: 40.7320303, lng: -73.9950879 };

	  var styles = [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }];

	  var mapOptions = {
			zoom: 15,
			center: latLng,
			styles: styles,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

	  // Start/Finish icons
	  var icons = {
	    start: new google.maps.MarkerImage(
	      'assets/img/driver-1.png',
	      new google.maps.Size(32, 32),
	      new google.maps.Point(0, 0),
	      new google.maps.Point(16, 32)
	  	),
	  	end: new google.maps.MarkerImage(
	      // URL
	      'assets/img/pin.png',
	      // (width,height)
	      new google.maps.Size(32, 32),
	      // The origin point (x,y)
	      new google.maps.Point(0, 0),
	      // The anchor point (x,y)
	      new google.maps.Point(16, 32)
	    )
	  };

	  // Custom Markers
	  function makeMarker(position, icon, title) {
	    new google.maps.Marker({
	      position: position,
	      map: map,
	      icon: icon,
	      title: title
	    });
	  }

	  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	  var service = new google.maps.DirectionsService;
	  var display = new google.maps.DirectionsRenderer({ suppressMarkers: true });

	  display.setMap(map);

	  service.route({
	    origin: { lat: 40.736987, lng: -74.0041162 }, 
	    destination: { lat: 40.7269795, lng: -73.9840837 }, 
	    travelMode: google.maps.DirectionsTravelMode.DRIVING
	  }, function(response, status) {
	    if (status == 'OK') {
	      display.setDirections(response);
	      var leg = response.routes[0].legs[0];
	      makeMarker(leg.start_location, icons.start, 'title');
	      makeMarker(leg.end_location, icons.end, 'title');
	    } else {
	      window.alert('Directions request failed due to ' + status);
	    }
	  });

	  //Resize Function
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});
	}

	google.maps.event.addDomListener(window, 'load', initMap);

});