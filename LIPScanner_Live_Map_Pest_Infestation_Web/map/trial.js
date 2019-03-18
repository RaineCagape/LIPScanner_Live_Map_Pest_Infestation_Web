var longitudePlacemat = document.getElementById("longitudePlacemat");
var firebaseLongitude = firebase.database().ref().child("infestedLocations");

firebaseLongitude.on('value',function(datasnapshot){
    longitudePlacemat.innerText = datasnapshot.val();
});
