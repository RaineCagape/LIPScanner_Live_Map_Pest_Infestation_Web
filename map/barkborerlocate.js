<script>
    addMarker({
        coords:{lat: 8.4465,lng:124.6370}, //Get syntax in retrieving loglat data in the database
        IconImage: 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png'
    })
    function addMarker(props){
        var markpest = newgoogle.maps.Marker({
          position: props.coords,
          map: map,  
        })
        if(props.iconImage){
            marker.setIcon(props.iconImage);
    }
</script>
