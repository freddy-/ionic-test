// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngCordova'])

.controller('ListBTController', function($scope, $ionicPlatform, $ionicLoading, $location){
  $ionicPlatform.ready(function() {

    //TODO verificar se isto esta 100% certo
    window.plugins.insomnia.keepAwake();

    bluetoothSerial.isEnabled(function () {

    }, function (reason) {
      //abre a config de bluetooth
      bluetoothSerial.showBluetoothSettings(function(){},function(){});
    });

    bluetoothSerial.isConnected(
      function() {          
          //mudar pra tela do gauge
          $location.path('/gauge');
      },

      function() { //nao esta conectado

        $scope.$apply(function () {
          $scope.select = function(btDevice){

            $ionicLoading.show({template: 'Conectando...'});

            bluetoothSerial.connect(btDevice.address,
              function(){
                console.log("conectado");
                $scope.$apply(function () {
                  $ionicLoading.hide();
                  //mudar pra tela do gauge
                  $location.path('/gauge');
                });

              }, function(){
                console.log("fail!");
                $scope.$apply(function () {
                  $ionicLoading.hide();
                });
            });
          };
        });

        bluetoothSerial.list(
          function(list){
            $scope.$apply(function () {
              $scope.items = list;
            });
          }, function(){
            console.log("fail!");
        });
      }
    );
  });
})

.controller('GaugeController', function($scope, $timeout, $ionicPlatform){
  
  //função map copiada do arduino
  var map = function(x, inMin, inMax, outMin, outMax){
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  $ionicPlatform.ready(function() {
    $scope.calculateRotations = function(rpm){

      //segundo a documentação do sensor de rotação e PMS, a frequencia lida do sensor deve ser multiplicada por 30
      rpm = rpm * 5; //constante do sensor de rotação e PMS - 300 RPM = 10Hz

      //TODO calcular RPM para graus
      //0 a 9000 RPM
      //285 a 423
      var anguloEscala;
      var anguloAgulha;

      //a imagem utilizada de fundo tem uma escala diferente quando é de 0 a 1000 RPM
      if(rpm <= 1000){
        anguloEscala = map(rpm, 0.0, 1000.0, 316.0, 325.0);
        anguloAgulha = map(rpm, 0.0, 1000.0, 285.0, 297.0);
      }else{
        anguloEscala = map(rpm, 1000.0, 9000.0, 325.0, 440.0);
        anguloAgulha = map(rpm, 1000.0, 9000.0, 297.0, 437.0);
      }

      $scope.escala = anguloEscala;
      $scope.agulha = anguloAgulha;
    };
    
    $scope.calculateRotations($scope.rangeval);

    if(bluetoothSerial != null){
      bluetoothSerial.subscribe(';', function (data) {
          //console.log(data);
          $scope.$apply(function () {
            $scope.calculateRotations(parseInt(data.replace(';', '')) * 10);
          });
      }, function(){

      });
    }
  });

  $scope.rangeval = 0;
  $scope.escala = 316;
  $scope.agulha = 285;

})


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