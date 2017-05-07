angular.module('app').controller('GaugeController', function($scope, $timeout, $ionicPlatform){
  
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

});