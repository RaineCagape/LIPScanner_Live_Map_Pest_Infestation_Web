var longFirebase, latFirebase, pestFirebase, icon, filter, long, lat, pest;
var coordinatesfirebase, option, access, loginmodal, desc, checkAcess;
var statusFirebase, stats, animate, nameFirebase, name, userfirebase, addressFirebase, address;
var contactFirebase, contact, reportFirebase, datereported, resolvedFirebase, dateresolved, resolvedon;
var address ='' ;


function setMarkers(map) {  
    //OPTION BACKEND 
    // Database Structure (JSON Format):
    //infestedLocations:{
        //<UID>_<pest><mmddyy>:{
            //E: <longitude>125.616725
            //N: <latittude>7.065393
            //datereported: <datestamp> Date.now();
            //dateresolved: <datestamp> default: 000000;          
            //pest: <pest>
            //status: <default: unresolve / resolved >
            //uid: <uid>"f9gGHSEErWTElcfphN2DEzVYuXC2"
            //kX6ltkDN7rRDiEI8HlYuwllc2SC3
        //}
   // }
   //user:{
        //<UID>:{
          //address:  <get by the mob app locator>
          //contactNo:  <user data>
          //name: <user data>
          //type: <admin/user>
        //}
   //}
    coordinatesfirebase = firebase.database().ref().child('infestedLocations');
    coordinatesfirebase.on('child_added', snap => {
     
      pestFirebase = snap.child('pest').val();
      latFirebase = snap.child('N').val();
      longFirebase = snap.child('E').val();
      nameFirebase = snap.child('name').val();
      addressFirebase = snap.child('address').val();
      contactFirebase = snap.child('contact').val();
      statusFirebase = snap.child('status').val();
      reportFirebase = snap.child('datereported').val();
      resolvedFirebase = snap.child('dateresolved').val();
  
      lat = Number(latFirebase);
      long = Number(longFirebase);
      pest = String(pestFirebase);
      name = String(nameFirebase);
      address = String(addressFirebase);
      contact = Number(contactFirebase);
      datereported = Number(reportFirebase);
      dateresolved = Number(resolvedFirebase);

      var month_name = function(dt){
        mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        return mlist[dt.getMonth()];
      };
    
      var arraydatereported = Array.from(reportFirebase.toString()).map(Number);
      var getMonReport = arraydatereported[0]+arraydatereported[1]+'/'+arraydatereported[2]+arraydatereported[3]+'/'+arraydatereported[4]+arraydatereported[5]+arraydatereported[6]+arraydatereported[7];
      var d = month_name(new Date(getMonReport));
      datereported = d +' '+arraydatereported[2]+arraydatereported[3]+', '+arraydatereported[4]+arraydatereported[5]+arraydatereported[6]+arraydatereported[7];

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

      if(statusFirebase == 'resolved'){
        animate = google.maps.Animation.DROP;
        var arraydateresolved = Array.from(resolvedFirebase.toString()).map(Number);
        var getMonResolved = arraydateresolved[0]+arraydateresolved[1]+'/'+arraydateresolved[2]+arraydateresolved[3]+'/'+arraydateresolved[4]+arraydateresolved[5]+arraydateresolved[6]+arraydateresolved[7];
        var dm = month_name(new Date(getMonResolved));
        dateresolved = dm +' '+arraydateresolved[2]+arraydateresolved[3]+', '+arraydateresolved[4]+arraydateresolved[5]+arraydateresolved[6]+arraydateresolved[7];
        resolvedon = ' on '+dateresolved+'';
      }
      else{
        animate = google.maps.Animation.BOUNCE;
        resolvedon ='';
      }
  
      var marker = new google.maps.Marker({ //Observe heree!!
        position: {lat: lat, lng: long},
        map: map,
        icon: image,
        animation: animate,
      });
      
        var infowindow = new google.maps.InfoWindow;

        infowindow.setContent('<div id="content">'+
          '<div id="bodyContent"><br>'+
          '<h5>'+name+'</h5>'+
          '<p><b>Address: </b>'+address +'<br>'+
          '<b>Contact Number: </b> '+contact+'<br><br>'+
          'Infested by '+ pestFirebase +' on '+ datereported +'<br>'+
          '<b>Status: </b>'+ statusFirebase + resolvedon +'</p> '+
          '</div>'+
          '</div>');

      google.maps.event.addListener(marker, 'click', function() {
        access = sessionStorage.getItem("Access");
        console.log('InfoWindow Access: '+access);
          if(access == 1){
            infowindow.open(map, marker);
          }
          else{
            // alert('You need to be logged as a BPI admin to view infestation information.');      
            const deniedmodal = document.querySelector('#deniedModal');
            $(deniedmodal).show();
            $('.modal-backdrop').show();
          }
    
        }); 
        
      // })

    })
 
}


