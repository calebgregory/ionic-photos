angular.module('starter.controllers', [])

.controller('FilterCtrl', function($scope, Pictures, $state) {
  $scope.search = function(searchTerms){
    Pictures.search(searchTerms, function(res){
      Pictures.setPhotos(res.photos.photo, function() {
        $state.go('tab.photographs');
      });
    });
  };
})


.controller('PhotoCtrl', function ($scope, $timeout, $ionicModal, $ionicSlideBoxDelegate, Pictures) {

  $scope.photos = Pictures.getPhotos();
  $scope.filterModalOpened = false;

  $ionicModal.fromTemplateUrl('image-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.filterModal = modal;
    $timeout(function() {
      photoSlideBox = $ionicSlideBoxDelegate.$getByHandle('photoSlideBox');
      $scope.currentSlide = photoSlideBox.selected();
    });
  });

  $scope.openModal = function(index) {
    $scope.currentSlide = index;
    if (!$scope.filterModalOpened) {
      $ionicSlideBoxDelegate.$getByHandle('photoSlideBox').slide(0);
      $scope.filterModalOpened = true;
      $scope.filterModal.show();
      return;
    }
    $scope.goToSlide(index);
    $scope.filterModal.show();
  };


  $scope.closeModal = function() {
    $scope.filterModal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.filterModal.remove();
  });

  $scope.$on('modal.hide', function() {

  });

  $scope.$on('modal.removed', function() {

  });

  $scope.$on('modal.shown', function() {
    console.log('Modal is shown!');
  });

  $scope.next = function() {
    $ionicSlideBoxDelegate.$getByHandle('photoSlideBox').next();
  };

  $scope.previous = function() {
    $ionicSlideBoxDelegate.$getByHandle('photoSlideBox').previous();
  };

  $scope.goToSlide = function(index) {
    $ionicSlideBoxDelegate.$getByHandle('photoSlideBox').slide(index);
  };

  $scope.slideHasChanged = function(index) {
    $scope.currentSlide = $ionicSlideBoxDelegate.$getByHandle('photoSlideBox').selected();
  };

})

.controller('LocationCtrl', function($scope, $http, $timeout, $ionicModal, $ionicSlideBoxDelegate, Pictures) {
  var geoSlideBox;
  $scope.geoModalOpened = false;
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
      $timeout(function(){
        $ionicSlideBoxDelegate.$getByHandle('geoSlideBox').update();
      });
    });
  });

  $ionicModal.fromTemplateUrl('image-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.geoModal = modal;
    $timeout(function() {
      geoSlideBox = $ionicSlideBoxDelegate.$getByHandle('geoSlideBox');
      $scope.currentSlide = geoSlideBox.selected();
    });
  });

  $scope.openModal = function(index) {
    $scope.currentSlide = index;
    if (!$scope.geoModalOpened) {
      $ionicSlideBoxDelegate.$getByHandle('geoSlideBox').slide(0);
      $scope.geoModalOpened = true;
      $scope.geoModal.show();
      return;
    }
    $scope.goToSlide(index);
    $scope.geoModal.show();
  };


  $scope.closeModal = function() {
    $scope.geoModal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.geoModal.remove();
  });

  $scope.$on('modal.hide', function() {

  });

  $scope.$on('modal.removed', function() {

  });

  $scope.$on('modal.shown', function() {
    console.log('Modal is shown!');
  });

  $scope.next = function() {
    $ionicSlideBoxDelegate.$getByHandle('geoSlideBox').next();
  };

  $scope.previous = function() {
    $ionicSlideBoxDelegate.$getByHandle('geoSlideBox').previous();
  };

  $scope.goToSlide = function(index) {
    $ionicSlideBoxDelegate.$getByHandle('geoSlideBox').slide(index);
  };

  $scope.slideHasChanged = function(index) {
    $scope.currentSlide = $ionicSlideBoxDelegate.$getByHandle('geoSlideBox').selected();
  };
});
