angular.module('starter.controllers', [])

.controller('FilterCtrl', function($scope, Pictures, $state) {


    $scope.search = function(searchTerms){
      Pictures.search(searchTerms, function(res){
        console.log(res);
        $scope.photoArray = res.photos.photo;
        $scope.photoSrc = `https://farm${$scope.photoArray[0].farm}.staticflickr.com/${$scope.photoArray[0].server}/${$scope.photoArray[0].id}_${$scope.photoArray[0].secret}.jpg`;
        console.log($scope.photoSrc);
        $state.go('tab.photographs', {img: $scope.photoSrc});
      })
    }


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
