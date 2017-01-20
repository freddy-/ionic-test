// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngCordova'])


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

    //TODO criar as outras functions para utilizar o bluetooth neste service
})

.controller('ctrl', function($scope, bluetooth, $timeout){
  $scope.teste = "teste";
  $timeout(function () {
    bluetooth.checkBT();
   },250);

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