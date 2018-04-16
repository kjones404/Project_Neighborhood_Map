// global var
var map;


// load map
function initMap() {

  // map presets
  var mapOptions = {
    zoom: 11,
    center: {lat: 29.4241226, lng: -98.493629}
  }
  // make map
  map = new
  google.maps.Map(document.getElementById("map"), mapOptions);

  ko.applyBindings(new ViewModel());

}

// add marker function
var addMarker  = function(data) {
  var self = this;

  this.position = data.latlong,
  this.icon = data.iconImg,
  this.title = data.locTitle,

  this.marker = new google.maps.Marker({
    position: this.position,
    icon: this.icon,
    title: this.title,
    map: map,
    animation: google.maps.Animation.DROP
  });

  // info window
  var infowindow = new google.maps.InfoWindow({
    content:this.title
  });

  // marker event listener to add info window
  this.marker.addListener("click", function() {
    infowindow.open(map, this);
  });
}

var addList = function (data) {
  this.title = ko.observerable(data.locTitle);
}

var ViewModel = function () {
  var self = this;

  // create array for sidebar list
  this.dataList = ko.observableArray([]);

  // loop through markers
  for (var i = 0; i < data.length; i++){
    // add marker
    addMarker(data[i]);
  }

  // loop through locations
  for (var i = 0; i < data.length; i++){
    // add to sidebar
    this.dataList.push(data[i])
  }



}
