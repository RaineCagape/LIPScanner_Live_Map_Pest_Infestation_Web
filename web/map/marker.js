var longFirebase, latFirebase, pestFirebase, icon, filter, long, lat;
var coordinatesfirebase, option, access, loginmodal, desc, checkAcess;
var statusFirebase, stats, nameFirebase, name ,reporterContact, contactNo;
var resolvedbyFirebase, resolvednoteFirebase, infestationId, reportFirebase, datereported, resolvedFirebase, dateresolved, resolvedon;
var viewInfo, resolvedby, resolvednote, infoContent;

var database = firebase.firestore();

function getInfoId(id){
  sessionStorage.setItem("infestationId", id);
  var infestationId = sessionStorage.getItem("infestationId");
  console.log("\n InfoWindow is Clicked! :"+infestationId);

}

function markerAnimate(getStatus){
  if(getStatus == 'resolved'){
    return google.maps.Animation.DROP;
  }
  else{
    return google.maps.Animation.BOUNCE;
  }

}

function filterMarkers(getPest,getMarker,getStatus,info){
  $("input[name=pestpick]").change(function (e) {
    info.close();
    var pestpicker = $("input[name=pestpick]:checked").val();
    console.log('Picked:'+pestpicker);
    if(pestpicker == 'All pest'){
      getMarker.setVisible(true);
    }
    else{
      if(getPest == pestpicker){
        getMarker.setVisible(true);
      }
      else{
        getMarker.setVisible(false);
      }
    }
  });
  $("input[name=statuspick]").change(function (e) {
    info.close();
    var statuspicker =$("input[name=statuspick]:checked").val();
    console.log('Picked:'+statuspicker);
    if(statuspicker == 'All status'){
      getMarker.setVisible(true);
    }
    else{
      if(getStatus == statuspicker){
        getMarker.setVisible(true);
      }
      else{
        getMarker.setVisible(false);
      }
    }   
  });
}

function getFullName(name){
  var fullname;
  database.collection('users').doc(name).get().then( doc => {   
    var reporterfirstName = doc.data().firstName;
    var reporterlastName = doc.data().lastName;
    fullname = reporterfirstName+ " "+ reporterlastName;
    console.log(fullname);
    return fullname;
  });
}
// function reverseGeocode(getlatlong){
//     var geocoder = new google.maps.Geocoder();
//     var address;

//     geocoder.geocode({'location': getlatlong}, function(res, stats){
//       if(stats === 'OK'){
//         if(res[0]){
//           address = res[0].formatted_address;
//         }
//         else{
//           address = 'Coordinates does not exists.';
//         }
//       }
//       else{
//        address = 'Geocoder failed due to:'+stats;
//       }
//     });
//     return address;
// }

function setMarkers(map) {  
  var pest, address, status;
  var info =  new google.maps.InfoWindow;
  coordinatesfirebase = firebase.database().ref().child('infestation');
  coordinatesfirebase.on('child_added', snap => { 
    infestationId = snap.key; 
    reportFirebase = snap.child('datetime').val();
    latFirebase = snap.child('latitude').val();
    longFirebase = snap.child('longitude').val();
    pestFirebase = snap.child('pest').val();
    nameFirebase = snap.child('reporter').val();

    statusFirebase = snap.child('status').val(); //Default to 'unresolved'
    resolvedFirebase = snap.child('dateresolved').val(); //Default to 'unresolved'
    resolvednoteFirebase = snap.child('resolvednote').val(); //Default to 'none'
    resolvedbyFirebase = snap.child('resolvedby').val(); //Default to 'none'

    datereported = String(reportFirebase);
    lat = Number(latFirebase);
    long = Number(longFirebase);
    pest = String(pestFirebase);
    
    if(statusFirebase == null){
        status = 'unresolve';
        // animate = google.maps.Animation.BOUNCE;
        dateresolved = ' ';
        resolvednote = 'None';
        resolvedby = 'None';
    }
    else{
      status = String(statusFirebase);
      // animate = google.maps.Animation.DROP;
      dateresolved = String(resolvedFirebase);
      if(resolvedbyFirebase == null){
        resolvednote = "Something's wrong.";
        resolvedby = "Something's wrong.";
      }
      else{
        if(resolvednoteFirebase == null){
          resolvednote = "None";
        }
        else{
          resolvednote = String(resolvednoteFirebase);
        }
        resolvedby = String(resolvedbyFirebase);
      }
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
    if(status == 'resolved'){
      resolvedon = ' on '+dateresolved+'<br><br><b>Note: </b><br><i>&nbsp;'+resolvednote+ '</i><br><b>Resolved by: </b> '+resolvedby;
        
        // viewInfo = document.querySelector('#view-info');
        // viewInfo.addEventListener('click', function(e){
        //   getInfoId(infestationId);
        // });
    }
    else{
      resolvedon =  '<br> ID: '+infestationId+'</p><br><button class="btn btn-sm btn-resolve" id="btn-resolve">Mark Infestation as Resolved</button>';
      // if($('#btn-resolve').length > 0){
      //   var isClicked = document.querySelector('#btn-resolve');
      //   isClicked.addEventListener('click', (e) => {
      //     e.preventDefault();
      //     getInfoId(infestationId);
      //     //push data status=resolved,resolvednote,resolvedby,dateresolved 
      //   });
      // }   
    }

    var marker = new google.maps.Marker({ 
      position: {lat: lat, lng: long},
      map: map,
      icon: image,
      animation:markerAnimate(status)
    });
    
    filterMarkers(pestFirebase,marker,status, info);
    
    var latlng = new google.maps.LatLng(lat,long);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng}, function(res, stats){
      if(stats == google.maps.GeocoderStatus.OK){
        if(res[1]){
          address = res[1].formatted_address;
          console.log(address);
        }
        else{
          address = 'Coordinates does not exists.';
        }
      }
      else{
        address = 'Geocoder failed due to:'+stats;
      }
    });
    
    infoContent = '<div id="content">'+'<div id="bodyContent"><br>'+
      '<h5>Farmer:</h5> <h6>'+ getFullName(nameFirebase) +'</h6><br>'+
      '<p><b>Address: </b>'+ address +'<br>'+
      '<b>Contact Number: </b>'+ contactNo +'<br><br>'+
      '<b>Infested by:</b> <br>'+ pestFirebase +' on '+ datereported +'<br>'+
      '<b>Status: </b><br>'+ status + resolvedon +
      '</div>'+
      '</div>';

    createInfowindow(infoContent,map,marker, info);
    // console.log('address '+ reverseGeocode(latlng,geocoder));
  }) //Firebase query end 

  
}

function createInfowindow(content,map,marker,infowindow){
  infowindow.setContent(content);
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
}






