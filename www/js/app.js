// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.constant('IP_GEO_URL', 'http://ip-api.com/json')
.constant('API_URL', 'https://api.flickr.com/services/rest/?api_key=9153d039695cd13736b0f04ddfdc5829&format=json&nojsoncallback=1&method=flickr.photos.search&tags=')

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });

  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    if (sessionStorage.restorestate == "true") {
      $rootScope.$broadcast('restorestate');
      sessionStorage.restorestate = false;
    }
  });

  window.onbeforeunload = function(event) {
    $rootScope.$broadcast('savestate');
  };
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.filter', {
    url: '/filter',
    views: {
      'tab-filter': {
        templateUrl: 'templates/tab-filter.html',
        controller: 'FilterCtrl'
      }
    }
  })

  .state('tab.photographs', {
      url: '/photographs',
      views: {
        'tab-photographs': {
          templateUrl: 'templates/tab-photographs.html',
          controller: 'PhotoCtrl'
        }
      }
    })

  .state('tab.location', {
    url: '/location',
    views: {
      'tab-location': {
        templateUrl: 'templates/tab-location.html',
        controller: 'LocationCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/filter');

});
