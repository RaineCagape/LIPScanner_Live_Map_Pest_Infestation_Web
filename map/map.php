<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map;
      function initMap() {
        //Get more accurate locator Syntax
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15
        });
        setMarkers(map);
        infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var userLatLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({position: userLatLng, map: map,  animation: google.maps.Animation.DROP,});
            infoWindow.open(map);
            map.setCenter(userLatLng);
            }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } 
        else {
          // if Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      function handleLocationError(browserHasGeolocation, infoWindow, userLatLng) {
        infoWindow.setPosition(userLatLng);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
    //locate pest infestations with marker
    var beaches = [
      [8.4465,124.6370],
    ];

    function setMarkers(map) {
      var image = {
        url: 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png',
        scaledSize: new google.maps.Size(35, 35),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
      };
      for (var i = 0; i < beaches.length; i++) {
        var beach = beaches[i];
        var marker = new google.maps.Marker({
          position: {lat: beach[0], lng: beach[1]},
          map: map,
          icon: image,
          animation: google.maps.Animation.BOUNCE,
        });
      }
    }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6OiUJeuWP82cOlwxHzAFlLlx51XS6mn4&callback=initMap"
    async defer></script>
  </body>
</html>
