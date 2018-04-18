// global var
var map;
var marker;


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


  // markers ver 2 working
  for (i = 0; i < data.length; i++) {
    var position = data[i].latlong;
    var icon = data[i].iconImg;
    var title = data[i].locTitle;

    marker = new google.maps.Marker({
      map: map,
      position: position,
      icon: icon,
      title: title,
      animation: google.maps.Animation.DROP
    });
    vm.dataList()[i].marker = marker;
  }
  ko.applyBindings(vm);
}

var ViewModel = function () {
  var self = this;

  // build locations from data.js
  var Location = function(data) {
    this.position = data.latlong;
    this.icon = data.iconImg;
    this.title = data.locTitle;
    this.type = data.type;
    this.show = ko.observable(true);
  };

  // create array for dynamic list
  this.dataList = ko.observableArray([]);

  // add location data to dynamic list
  data.forEach(function(dataItem) {
    self.dataList.push(new Location(dataItem));
  });

  // set values for dropdown/filter menu in index.html
  self.filter = ['Everything', 'Food', 'Movies', 'Arcades', 'Parks'];
  self.selectedFilter = ko.observable(self.filter[0]);

  self.filterLocation = ko.computed(function() {
    var locationList = self.dataList();
    var selectedFilter = self.selectedFilter();
    // loop through list of locations to match filter choice from filter dropdown
    for (var i = 0; i < locationList.length; i++) {
      if (selectedFilter === self.filter[0]) {
        locationList[i].show(true);
      if (marker) {
        locationList[i].marker.setVisible(true);
        }
      } else if (selectedFilter !== locationList[i].type) {
        locationList[i].show(false);
        locationList[i].marker.setVisible(false);
      } else {
        locationList[i].show(true);
        locationList[i].marker.setVisible(true);
      }
    }
  });
}
var vm = new ViewModel();
