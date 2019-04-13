var longFirebase, latFirebase, pestFirebase, icon, filter, long, lat, pest, coordinatesfirebase, option;
var address ='' ;
function setMarkers(map) {  
    
    if(option = ""){
      coordinatesfirebase = firebase.database().ref().child('infestedLocations');
    }
    else if(option ='All'){
      coordinatesfirebase = firebase.database().ref().child('infestedLocations');
    }
    else{
      var query = firebase.database().ref('infestedLocations');
      coordinatesfirebase = query.orderByChild("pest").equalTo(option);
    }
    
    coordinatesfirebase.on('child_added', snap => {
     
      pestFirebase = snap.child('pest').val();
      latFirebase = snap.child('N').val();
      longFirebase = snap.child('E').val();
  
      lat = Number(latFirebase);
      long = Number(longFirebase);
      pest = String(pestFirebase);
  
      //for icon filter
      filter = pest;
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
  
      var marker = new google.maps.Marker({ //Observe heree!!
        position: {lat: lat, lng: long},
        map: map,
        icon: image,
        animation: google.maps.Animation.BOUNCE,
      });
      
      var geocoder = new google.maps.Geocoder;
      var infowindow = new google.maps.InfoWindow;
      var latlng = {lat:lat, lng:long};

      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            infowindow.setContent('<div id="content">'+
                '<div id="bodyContent"><br>'+
                '<h6>User Name</h6>'+
                '<p><b>Address: </b>'+ results[0].formatted_address +'<br>'+
                '<b>Contact Number: </b> User Data<br>'+
                '<b>Date:</b> User Data<br><br>'+
                'Infested by '+ pest +' on (Date Infested)<br>'+
                '<b>Status: </b>Resolved/Unresolved</p>'+
                '</div>'+
                '</div>');
          } 
          else {
            infowindow.setContent('<div id="content">'+
                '<div id="bodyContent"><br>'+
                '<h6>User Name</h6>'+
                '<p><b>Address: </b> No results found <br>'+
                '<b>Contact Number: </b> User Data<br>'+
                '<b>Date:</b> User Data<br><br>'+
                'Infested by '+ pest +' on (Date Infested)<br>'+
                '<b>Status: </b>Resolved/Unresolved</p>'+
                '</div>'+
                '</div>');
          }
        } 
        else {
          infowindow.setContent('<div id="content">'+
          '<div id="bodyContent"><br>'+
          '<h6>User Name</h6>'+
          '<p><b>Address: </b> Geocoder failed due to: '+ status+'<br>'+
          '<b>Contact Number: </b> User Data<br>'+
          '<b>Date:</b> User Data<br><br>'+
          'Infested by '+ pest +' on (Date Infested)<br>'+
          '<b>Status: </b>Resolved/Unresolved</p>'+
          '</div>'+
          '</div>');
        }
      });
      //Set user type identifier limit data access
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });


    })  

     
}


