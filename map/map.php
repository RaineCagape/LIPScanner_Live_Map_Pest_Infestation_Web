
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
      #map {
        height: 100%;
      }
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
        //if option is set-SELECT WHERE pest=option
        //else SELECT *
      //Locate pest infestation through 
     
      var locationData = [//syntax in retrieving data in database and assign it here
        [8.4435,124.6536,'Bark Borer'],
        [8.4465,124.6370,'Mealy Bug'], 
        [8.4491,124.6466,'Mussel Scale Insect'],
        [8.4453,124.6424,'Twig Borer'],
        [8.4439,124.6416,'Aphid'],
        [8.4419,124.6258,'Bark Borer'],
      ];

      function setMarkers(map) {
         
          var icon, option, filter, coordinates, pickPest;
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
                icon= 'http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png';
              break;
              case 'Mealy Bug':
                icon= 'http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png';
              break;
              case 'Aphid':
                icon= 'http://maps.google.com/mapfiles/kml/pushpin/wht-pushpin.png';
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
            pickPest =  '<?php echo $_SESSION['optionpick']; ?>';
            if(pickPest==filter){
                var marker = new google.maps.Marker({
                position: {lat: coordinates[0], lng: coordinates[1]},
                map: map,
                icon: image,
                animation: google.maps.Animation.BOUNCE,
              });
            }
            else if(pickPest=='All'{
              var marker = new google.maps.Marker({
                position: {lat: coordinates[0], lng: coordinates[1]},
                map: map,
                icon: image,
                animation: google.maps.Animation.BOUNCE,
              });

            })
          }
        }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6OiUJeuWP82cOlwxHzAFlLlx51XS6mn4&callback=initMap"
    async defer></script>
  </body>
</html>
