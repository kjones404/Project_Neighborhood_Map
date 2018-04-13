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


    var markers = [
      {
        latlong:{lat: 29.4241226, lng: -98.493629},
        iconImg: "https://maps.google.com/mapfiles/ms/micons/ltblue-dot.png",
        locTitle: "center",
        content: " center of map "
      },
      {
        latlong:{lat: 29.5351, lng: -98.6408},
        iconImg: "https://maps.google.com/mapfiles/ms/micons/green-dot.png",
        locTitle: "O. P. Schnabel Park",
        content: "O. P. Schnabel Park is a 202-acre city park in the City of San Antonio, Texas. The park includes buildings for the YMCA program, ball fields, a basketball court, and several trails"
      }
    ];

     // loop through markers
     for (var i = 0; i < markers.length; i++){
       // add marker
       addMarker(markers[i]);
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
      content:location.content
    });

    // marker event listener to add info window
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });

  }
}
