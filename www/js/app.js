// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngCordova'])

.controller('ListBTController', function($scope){

})

.controller('GaugeController', function($scope){

})

.service('bluetooth', function() {
    this.checkBT = function () {
      bluetoothSerial.isEnabled(function () {
        console.log("Bluetooth is Enabled.");
      }, function (reason) {
        console.log("Bluetooth is *not* Enabled.");
        //abre a config de bluetooth
        bluetoothSerial.showBluetoothSettings(function(){},function(){});
      });
    };

    //TODO expor o objeto bluetooth serial
})

.controller('ctrl', function($scope, bluetooth, $timeout, $ionicPlatform){
  $ionicPlatform.ready(function() {
    console.log("ready");
    bluetooth.checkBT();

    var map = function(x, inMin, inMax, outMin, outMax){
      return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    $scope.calculateRotations = function(rpm){

      console.log(rpm);

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
  });

  $scope.rangeval = 0;
  $scope.escala = 316;
  $scope.agulha = 285;

})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('listBT', {
      url: '/listBT',
      templateUtl: 'templates/listBT.html',
      controller: 'ListBTController'
    })
    .state('gauge', {
      url: '/gauge',
      templateUtl: 'templates/gauge.html',
      controller: 'GaugeController'
    });

    $urlRouterProvider.otherwise('/listBT');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
	
	//http://stackoverflow.com/questions/22661494/view-ionic-mobile-app-on-fullscreen
  //esconde a statusbar
	StatusBar.hide();
/*
    //https://github.com/don/BluetoothSerial/issues/181
    //verifica se o bluetooth esta habilitado
    bluetoothSerial.isEnabled(function () {
      console.log("Bluetooth is Enabled.");
    }, function (reason) {
      console.log("Bluetooth is *not* Enabled.");
      //abre a config de bluetooth
      bluetoothSerial.showBluetoothSettings(function(){},function(){});
    });


    //lista os dispositivos pareados
    bluetoothSerial.list(
      function(list){
        console.log("\n\n");
        console.log("dispositivos encontrados");

        for (var i = list.length - 1; i >= 0; i--) {
          console.log(list[i].name + " " + list[i].address);
        };

        //conecta com o dispositivo com MAC ADDR
        bluetoothSerial.connect("20:14:08:26:25:64",
          function(){
            console.log("conectado");

            //aplica um listener para quando o dispositivo enviar dados
            bluetoothSerial.subscribe('-', function(data){
                console.log(data);
            }, function(){

            });

            //envia dados para o dispositivo
            bluetoothSerial.write("hello-", function(){}, function(){});

          },function(){
            console.log("fail!");
          });

      }, function(){
          console.log("fail!");
      });
    
*/

  });

});