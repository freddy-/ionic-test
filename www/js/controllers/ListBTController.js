angular.module('app').controller('ListBTController', function($scope, $ionicPlatform, $ionicLoading, $location){

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
});