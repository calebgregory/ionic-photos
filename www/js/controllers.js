angular.module('starter.controllers', [])

.controller('FilterCtrl', function($scope, Pictures, $state) {
	$scope.search = function(searchTerms){
      Pictures.search(searchTerms, function(res){
        console.log(res);
        $scope.photoArray = res.photos.photo;
        $scope.photoSrc = `https://farm${$scope.photoArray[0].farm}.staticflickr.com/${$scope.photoArray[0].server}/${$scope.photoArray[0].id}_${$scope.photoArray[0].secret}.jpg`;
        console.log($scope.photoSrc);
        // $state.go('tab.photographs', {img: $scope.photoSrc});
      })
    }
})


.controller('PhotoCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {

  	$scope.aImages = [{
      	'src' : 'http://biology.clc.uc.edu/graphics/bio106/regular%20flower.jpg',
      	'msg' : 'Swipe left to start slides. '
    	}, {
        'src' : 'http://www.whats-your-sign.com/images/ZodiacFlowerCarnation.jpg',
        'msg' : '1'
      },
      {
        'src' : 'http://www.fiftyflowers.com/site_files/FiftyFlowers/Image/Product/Dark_Orange_Red_Aisatic_Lily_Flower_Black_Out_150.jpg',
        'msg' : '2'
      },
      {
        'src' : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQd0EFRp4a1i7kv7eX2xGyydQqK_Wid9IZwEAvZZ6jWVUDxikmxtg',
        'msg' : '3'
      },
      {
        'src' : 'http://www.fiftyflowers.com/site_files/FiftyFlowers/Image/Product/Yellow_Daffodils_Flower_150.jpg',
        'msg' : '4'
      },

      {
        'src' : 'http://png.clipart.me/graphics/thumbs/131/five-red-paper-flowers-on-white-background_131940689.jpg',
        'msg' : '5'
      },

      {
        'src' : 'http://images.fiftyflowers.com/site_files/FiftyFlowers/Image/Product/Daisy-Florisol-Green-Tinted-Close-150_8967006b.jpg',
        'msg' : '6'
      },

      {
        'src' : 'http://typesofflower.com/wp-content/uploads/2015/04/how-to-care-in-flowers-in-vase-delivery-150x150.jpg',
        'msg' : '7'
      },
       {
        'src' : 'http://www.loomahat.com/wp-content/uploads/2013/04/Fabric-Flower-Clover-1-Flower-150x150.jpg',
        'msg' : 'End of slides. Tap to close.'
    }];

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
  }
])

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
