angular.module('starter.controllers', [])

.controller('FilterCtrl', function($scope, Pictures, $state) {
  $scope.search = function(searchTerms){
    Pictures.search(searchTerms, function(res){
      Pictures.setPhotos(res.photos.photo, function() {
        $state.go('tab.photographs');
      });
      // $scope.photoArray = res.photos.photo;
      // $scope.photoSrc = `https://farm${$scope.photoArray[0].farm}.staticflickr.com/${$scope.photoArray[0].server}/${$scope.photoArray[0].id}_${$scope.photoArray[0].secret}.jpg`;
      // console.log($scope.photoSrc);
    })
  }
})


.controller('PhotoCtrl', function ($scope, $ionicModal, $ionicSlideBoxDelegate, Pictures) {

  $scope.aImages = Pictures.getPhotos();

  $ionicModal.fromTemplateUrl('image-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $ionicSlideBoxDelegate.slide(0);
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.$on('modal.hide', function() {

  });

  $scope.$on('modal.removed', function() {

  });

  $scope.$on('modal.shown', function() {
    console.log('Modal is shown!');
  });

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.goToSlide = function(index) {
    $scope.modal.show();
    $ionicSlideBoxDelegate.slide(index);
  }

  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
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

    Pictures.getGeoPhotos($scope.bbox.toString(), function(res) {
      $scope.photos = res.photos.photo;
    });
  });
});
