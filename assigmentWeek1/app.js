(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  $scope.lunch = "";
  $scope.message = "";
  

  $scope.showMessage = function () {
    //$scope.message = "Hello";
    var test = checkLunch($scope.lunch);
    $scope.message = test;
  };


  function checkLunch(string) {
    var rtn = "";
    if (string == "") {
      rtn = "Please enter";
    }else {
      var words = string.split(",");
      if (words.length > 3) {
        rtn = "Too much";
      }else {
        rtn = "Enjoy";
      }
    }

    return rtn;
  }

});


})();
