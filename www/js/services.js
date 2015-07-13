angular.module('starter.services', [])

.factory('Pictures', function($http, $rootScope, IP_GEO_URL, API_URL) {
  var pictures = {
    photos : {},

    search : function search(searchTerms, cb){
      $http
        .get(`${API_URL}${searchTerms}`)
        .success(cb)
    },

    geoLoc : function geoLoc(cb){
      $http
        .get(`${IP_GEO_URL}`)
        .success(cb);
    },

    getGeoPhotos : function getPhotos(boxBounds, cb) {
      $http
        .get(`${API_URL}&bbox=${boxBounds}`)
        .success(cb);
    },

    setPhotos : function setPhotos(photos, cb) {
      pictures.photos = photos;
      cb();
    },

    getPhotos : function getPhotos() {
      return pictures.photos;
    },

    SaveState : function() {
      sessionStorage.Pictures = angular.toJson(pictures.photos);
    },

    RestoreState : function() {
      pictures.photos = angular.fromJson(sessionStorage.Pictures);
    }
  };

  $rootScope.$on("savestate", pictures.SaveState);
  $rootScope.$on("restorestate", pictures.RestoreState);
  return pictures;
});

