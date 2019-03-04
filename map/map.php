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
            var marker = new google.maps.Marker({position: userLatLng, map: map,  animation: google.maps.Animation.BOUNCE,});
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
        //if option is set-SELECT WHERE pest=option
        //else SELECT *
      //Locate pest infestation through markers
      var locationData = [
        [8.4465,124.6370,'Bark Borer'], //syntax in retrieving data in database and assign it here
      ];

      function setMarkers(map) {
         
          var icon, option, filter, coordinates;
          for (var i = 0; i < locationData.length; i++) {
            coordinates = locationData[i];
            //for icon filter
            filter = coordinates[2];
            switch(filter) {
              case 'Bark Borer':
                icon= 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png';
              break;
              case 'Mussel Scale Insect':
                icon=  'http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png';
              break;
              case 'Twig Borer':
                icon= 'http://maps.google.com/mapfiles/kml/pushpin/green-pushpin.png';
              break;
              case 'Mealy Bug':
                icon= 'http://maps.google.com/mapfiles/kml/pushpin/yellow-pushpin.png';
              break;
              case 'Aphid':
                icon= 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png';
              break;
            }
            //set icon style
            var image = {
              //marker color code for pest
                url: icon,
                scaledSize: new google.maps.Size(35, 35),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 32)
            };
              var marker = new google.maps.Marker({
              position: {lat: coordinates[0], lng: coordinates[1]},
              map: map,
              icon: image,
              animation: google.maps.Animation.DROP,
            });

            // } 
          }
        }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6OiUJeuWP82cOlwxHzAFlLlx51XS6mn4&callback=initMap"
    async defer></script>
  </body>
</html>
