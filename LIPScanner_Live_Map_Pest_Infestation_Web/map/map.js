
function initMap() {
   //Get more accurate locator Syntax
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15
  });
  setMarkers(map);
  infoWindow = new google.maps.InfoWindow;
  //Get User Location
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

// var locationData= [//syntax in retrieving data in database and assign it here
//   [7.057290, 125.610828,'Bark Borer'],
//   [7.055740, 125.610187,'Mealy Bug'], 
//   [7.056366, 125.607881,'Mussel Scale Insect'],
//   [7.056243, 125.604280,'Twig Borer'],
//   [7.059059, 125.607834,'Aphid'],
//   [7.0610853,125.6126775,'Bark Borer'],
// ];
  var locationData;
  var coordinatesfirebase = firebase.database().ref().child('infestedLocations');
  coordinatesfirebase.on('child_added', snap => {
    var long = snapshot.child('N').val();
    var lat = snapshot.child('E').val();
    var pest = snapshot.child('pest').val();

    locationData = [ 
      [long ,lat,pest] 
    ];

  })

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
        anchor: new google.maps.Point(0, 32),
        type: 'poly',
      };
      var marker = new google.maps.Marker({
        position: {lat: coordinates[0], lng: coordinates[1]},
        map: map,
        icon: image,
        animation: google.maps.Animation.BOUNCE,
      });
    }
  }

