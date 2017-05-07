// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngCordova'])

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('listBT', {
      url: '/listBT',
      templateUrl: 'templates/listBT.html',
      controller: 'ListBTController'
    })
    .state('gauge', {
      url: '/gauge',
      templateUrl: 'templates/gauge.html',
      controller: 'GaugeController'
    })

    $urlRouterProvider.otherwise('/listBT');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {	
    //http://stackoverflow.com/questions/22661494/view-ionic-mobile-app-on-fullscreen
    //esconde a statusbar
    StatusBar.hide();
  });
});