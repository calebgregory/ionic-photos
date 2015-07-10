angular.module('starter.controllers', [])

.controller('FilterCtrl', function($scope) {})

.controller('PhotoCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
})


.controller('LocationCtrl', function($scope, $http, Pictures) {
  // get user's geolocation using their ip address
  Pictures.geoLoc(function(res) {
    $scope.lat = res.lat;
    $scope.lon = res.lon;
    $scope.bbox = {
      minLon : res.lon - .006, // make a square of lengths
      minLat : res.lat - .006, // .2 degrees with the user's
      maxLon : res.lon + .006, // geolocation as the center
      maxLat : res.lat + .006,
      toString : function() { return `${this.minLon},${this.minLat},${this.maxLon},${this.maxLat}`; }
    };

    Pictures.getPhotos($scope.bbox.toString(), function(res) {
      $scope.photos = res.photos.photo;
    });
  });
});
