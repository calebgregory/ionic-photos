angular.module('starter.services', [])

.factory('Pictures', function($http, IP_GEO_URL, API_URL) {
  return {
    search(searchTerms, cb){
      $http
        .get(`${API_URL}${searchTerms}`)
        .success(cb)
    }
    ,
    geoLoc(cb){
      $http
        .get(`${IP_GEO_URL}`)
        .success(cb);
    }
    ,
    getPhotos(boxBounds, cb) {
      $http
        .get(`${API_URL}&bbox=${boxBounds}`)
        .success(cb);
    }
  }
});

