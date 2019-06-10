var longFirebase, latFirebase, pestFirebase, icon, filter, long, lat, pest;
var coordinatesfirebase, option, access, loginmodal, desc, checkAcess;
var statusFirebase, stats, animate, nameFirebase, name, userfirebase, addressFirebase, address;
var resolvedbyFirebase, resolvednoteFirebase, contactFirebase, contact, infestationId, reportFirebase, datereported, resolvedFirebase, dateresolved, resolvedon;
var address, viewInfo, resolvedby, resolvednote  = '' ;

function getInfoId(id){
  sessionStorage.setItem("infestationId", id);
  var infestationId = sessionStorage.getItem("infestationId");
  console.log("\n InfoWindow is Clicked! :"+infestationId);

}

function setMarkers(map) {  
    coordinatesfirebase = firebase.database().ref().child('infestation');
    coordinatesfirebase.on('child_added', snap => {
     
      // infestationId = snap.key; //child('infestationId').val(); 
      reportFirebase = snap.child('datetime').val();
      latFirebase = snap.child('latitude').val();
      longFirebase = snap.child('longitude').val();
      pestFirebase = snap.child('pest').val();
      nameFirebase = snap.child('reporter').val();
      statusFirebase = snap.child('status').val();

      //change name to full name
      addressFirebase = snap.child('address').val(); //Geocode Address
      contactFirebase = snap.child('contact').val(); //Put contact
      resolvedFirebase = snap.child('dateresolved').val(); //Default to 'unresolved'
      resolvednoteFirebase = snap.child('resolvednote').val(); //Default to 'none'
      resolvedbyFirebase = snap.child('resolvedby').val(); //Default to 'none'
      

      datereported = Number(reportFirebase);
      lat = Number(latFirebase);
      long = Number(longFirebase);
      pest = String(pestFirebase);
      name = String(nameFirebase);


      if(addressFirebase = null){
        address = 'Value Request Default';
      }
      else{
        address = String(addressFirebase);
      }
      if(contactFirebase = null){
        contact = 'Value Request Default';
      }
      else{
        contact = Number(contactFirebase);
      }
      if(resolvedFirebase = null){
        dateresolved = 'Value Request Default';
      }
      else{
        dateresolved = Number(resolvedFirebase);
      }
      if(resolvednoteFirebase = null){
        resolvednote = 'Value Request Default';
      }
      else{   
       resolvednote = String(resolvednoteFirebase);
      }
      if(resolvedbyFirebase = null){
        resolvedby = 'Value Request Default';
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
        animate = google.maps.Animation.BOUNCE;
        resolvedon =  '<br> ID: '+infestationId+'</p><br><button class="btn btn-sm btn-resolve" id="btn-resolve">Resolved Infestation</button>';
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
          '<h5>Farmer:</h5> <h6>'+name+'</h6><br>'+
          '<p><b>Address: </b>'+address +'<br>'+
          '<b>Contact Number: </b> '+contact+'<br><br>'+
          '<b>Infested by</b> '+ pestFirebase +' on '+ datereported +'<br>'+
          '<b>Status: </b>'+ statusFirebase + resolvedon +
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




