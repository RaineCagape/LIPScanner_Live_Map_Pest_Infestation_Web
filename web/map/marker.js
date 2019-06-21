var longFirebase, latFirebase, pestFirebase, icon, filter, long, lat, pest;
var coordinatesfirebase, option, access, loginmodal, desc, checkAcess;
var statusFirebase, stats, animate, nameFirebase, name ,reporterContact, contactNo, addressFirebase;
var resolvedbyFirebase, resolvednoteFirebase, infestationId, reportFirebase, datereported, resolvedFirebase, dateresolved, resolvedon;
var address, viewInfo, resolvedby, resolvednote  = '' ;
var database = firebase.firestore();

function getInfoId(id){
  sessionStorage.setItem("infestationId", id);
  var infestationId = sessionStorage.getItem("infestationId");
  console.log("\n InfoWindow is Clicked! :"+infestationId);

}

function setMarkers(map) {  
    coordinatesfirebase = firebase.database().ref().child('infestation');
    coordinatesfirebase.on('child_added', snap => {
     
      infestationId = snap.key; 
      reportFirebase = snap.child('datetime').val();
      latFirebase = snap.child('latitude').val();
      longFirebase = snap.child('longitude').val();
      pestFirebase = snap.child('pest').val();
      nameFirebase = snap.child('reporter').val();

      // addressFirebase = snap.child('address').val(); //Geocode Address
      resolvedFirebase = snap.child('dateresolved').val(); //Default to 'unresolved'
      resolvednoteFirebase = snap.child('resolvednote').val(); //Default to 'none'
      resolvedbyFirebase = snap.child('resolvedby').val(); //Default to 'none'

      datereported = String(reportFirebase);
      lat = Number(latFirebase);
      long = Number(longFirebase);
      pest = String(pestFirebase);

      database.collection('users').doc(nameFirebase).get().then( doc => {   
        
        var reporterContact = doc.data().contactNo;
        var reporterfirstName = doc.data().firstName;
        var reporterlastName = doc.data().lastName;
        contactNo = reporterContact;
        name = reporterfirstName+ " "+ reporterlastName;
      });
      
      var geocoder = new google.maps.Geocoder;
      var latlng = {
        lat: parseFloat(lat), 
        lng: parseFloat(long)  
      };
      geocoder.geocode({'location': latlng}, 
      function(results, status){
        if(status === 'OK'){
          if(results[0]){
            address = results[0].formatted_address;
          }
          else{
            address ='Coordinates does not exists.';
          }
        }
        else{
          address='Geocoder failed due to:'+status;
        }
      });
      
      if(resolvedFirebase == null){
        dateresolved = ' ';
      }
      else{
        dateresolved = Number(resolvedFirebase);
      }
      if(resolvednoteFirebase == null){
        resolvednote = 'None';
      }
      else{   
       resolvednote = String(resolvednoteFirebase);
      }
      if(resolvedbyFirebase = null){
        resolvedby = 'None';
      }
      else{
        resolvedby = String(resolvedbyFirebase);
      }
     
      //for icon filter
      filter = pest;
        switch(filter) {
          case 'Bark Borer':
            icon= 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png';
          break;
          case 'Mussel Scale':
            icon=  'http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png';
          break;
          case 'Twig Borer':
            icon= 'http://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png';
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

      //determine resolved/unresolved conditions
      if(statusFirebase == 'resolved'){
        animate = google.maps.Animation.DROP;
        resolvedon = ' on '+dateresolved+'<br><br><b>Note: </b><br><i>&nbsp;'+resolvednote+ '</i><br><b>Resolved by: </b> '+resolvedby;
        
        // viewInfo = document.querySelector('#view-info');
        // viewInfo.addEventListener('click', function(e){
        //   getInfoId(infestationId);
        // });

      }
      else{
        statusFirebase = 'Unresolved';
        animate = google.maps.Animation.BOUNCE;
        resolvedon =  '<br> ID: '+infestationId+'</p><br><button class="btn btn-sm btn-resolve" id="btn-resolve">Resolve Infestation</button>';
        if($('#btn-resolve').length > 0){
          const isClicked = document.querySelector('#btn-resolve');
          isClicked.addEventListener('click', (e) => {
            e.preventDefault();
            getInfoId(infestationId);
          });
        }
       
      }
      
      //Set infestation markers
      var marker = new google.maps.Marker({ 
        position: {lat: lat, lng: long},
        map: map,
        icon: image,
        animation: animate,
      });
      
      //Set InfoWindow 
      var infowindow = new google.maps.InfoWindow;

        infowindow.setContent('<div id="content">'+
          '<div id="bodyContent"><br>'+
          '<h5>Farmer:</h5> <h6>'+ name +'</h6><br>'+
          '<p><b>Address: </b>'+ address +'<br>'+
          '<b>Contact Number: </b>'+ contactNo +'<br><br>'+
          '<b>Infested by:</b> <br>'+ pestFirebase +' on '+ datereported +'<br>'+
          '<b>Status: </b><br>'+ statusFirebase + resolvedon +
          '</div>'+
          '</div>');

        //Limit InfoWindow Viewing
      google.maps.event.addListener(marker, 'click', function() {
        access = sessionStorage.getItem("Access");
        console.log('InfoWindow Access: '+access);
          if(access == 1){
            infowindow.open(map, marker);
          }
          else{     
            const deniedmodal = document.querySelector('#deniedModal');
            $(deniedmodal).show();
            $('.modal-backdrop').show();
          }
      }); 

    })
 
}




