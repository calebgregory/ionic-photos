angular.module('starter.controllers', [])

.controller('FilterCtrl', function($scope, Pictures, $state) {

    $scope.search = function(searchTerms){
      console.log(searchTerms);
      Pictures.search(searchTerms, function(res){
        console.log(res);
        $scope.photoArray = res.photos.photo;
        $scope.photoSrc = `https://farm${$scope.photoArray[0].farm}.staticflickr.com/${$scope.photoArray[0].server}/${$scope.photoArray[0].id}_${$scope.photoArray[0].secret}.jpg`;
        console.log($scope.photoSrc);
        $state.go('tab.photographs');
      })
    }

})


.controller('LocationCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
});
