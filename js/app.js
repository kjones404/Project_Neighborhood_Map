// global var
var map;
var marker;


// load map
function initMap() {

  // map presets
  var mapOptions = {
    zoom: 11,
    // make center of map San Antonio
    center: {lat: 29.4241226, lng: -98.493629}
  }
  // create new map using map options
  map = new
  google.maps.Map(document.getElementById("map"), mapOptions);


  // loop through data to assign values for markers
  for (i = 0; i < data.length; i++) {
    var position = data[i].latlong;
    var icon = data[i].iconImg;
    var title = data[i].locTitle;

    // create markers
    marker = new google.maps.Marker({
      map: map,
      position: position,
      icon: icon,
      title: title,
      animation: google.maps.Animation.DROP
    });
    // link marker data to setVisible
    vm.dataList()[i].marker = marker;

    // set width of pop up window
    var infoWindow = new google.maps.InfoWindow({
      maxWidth: 100
    });

    // add click event to bounce and pop up info window
    marker.addListener('click', function() {
      selected(this);
      loadInfo(this, infoWindow);
    });

    // set maker to bounce once on click
    function selected(marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null)
        }, 750);
    }

    // load content into pop up window
    function loadInfo(marker, infoWindow) {
      infoWindow.setContent(marker.title);
      infoWindow.open(map, marker);
    };


  }
  // enable use of variables from the viewModel
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

  //  open pop up window when list item is clicked
  self.setPop = function(list) {
  google.maps.event.trigger(list.marker, 'click');
};
  });
}
var vm = new ViewModel();

// toggle side bar
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
};
