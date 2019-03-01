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
      var map,userLocate;
      //syntax will be change for getting the location of the user (see documentation)
      var userLocate = {lat:7.055630, lng:125.610491}; 
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: userLocate,
          zoom: 15
        });
        var marker = new google.maps.Marker({position: userLocate, map: map});
      }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6OiUJeuWP82cOlwxHzAFlLlx51XS6mn4&callback=initMap"
    async defer></script>
  </body>
</html>
