var longitudePlacemat = document.getElementById("longitudePlacemat");
var firebaseLongitude = firebase.database().ref().child("longitude");

firebaseLongitude.on('value',function(datasnapshot){
    longitudePlacemat.innerText = datasnapshot.val();
});
