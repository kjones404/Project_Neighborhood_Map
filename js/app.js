var map;

// load map
function initMap() {

    // map presets
    var mapOptions = {
      zoom: 10,
      center: {lat: 29.4241226, lng: -98.493629}
    }
    // make map
    map = new
    google.maps.Map(document.getElementById("map"), mapOptions);

     // loop through markers
     for (var i = 0; i < parkMarkers.length; i++){
       // add marker
       addMarker(parkMarkers[i]);
     }

     // loop through markers
     for (var i = 0; i < movieMarkers.length; i++){
       // add marker
       addMarker(movieMarkers[i]);
     }

    // add marker function
    function addMarker (location){
    var marker = new google.maps.Marker({
      position: location.latlong,
      icon: location.iconImg,
      title: location.locTitle,
      map: map,
      animation: google.maps.Animation.DROP
    });

    // info window
    var infowindow = new google.maps.InfoWindow({
      content:location.locTitle
    });

    // marker event listener to add info window
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });

  }
}
