
function initMap() {
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8
  });
 
  infoWindow = new google.maps.InfoWindow;
  //Get User Location
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
  };
   var userMarker = new google.maps.Marker({position: userLatLng, map: map,  animation: google.maps.Animation.DROP,});
      // infoWindow.open(map);
      map.setCenter(userLatLng);
    }, 
   function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } 
  else {
    // if Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  new setMarkers(map);
}

function handleLocationError(browserHasGeolocation, infoWindow, userLatLng) {
    infoWindow.setPosition(userLatLng);
    infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
 
// function setupClickListener(option) {
//     optionPicked = document.getElementById('pestpick');

//     radioButton.addEventListener('click', function() {
//       option = optionPicked.value;
//     });
//   }