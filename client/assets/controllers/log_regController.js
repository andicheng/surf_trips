app.controller('log_regController', ['$scope','usersFactory', '$location','$routeParams', function($scope, usersFactory, $location, $routeParams) {

   $scope.register = function(user){
      if($scope.newUser && $scope.newUser.password == $scope.newUser.confpass){
         usersFactory.register($scope.newUser, function(data){
            if(data.data.errors){
               $scope.errors = data.data.errors;
            }else{
               $scope.user = data.data;
               $location.url('/dashboard')
            }
         }, function(err){
            console.log("I am an error",err);
         })
      }else{
         $scope.errors = {confirm: "Password not confirmed"}
      }
   }
   $scope.login = function(user){
      usersFactory.login($scope.user, function(data){
         console.log(data)
         if(data.data.errors){
            $scope.errors = data.data.errors;
         }else{
            $location.url('/dashboard')
         }
      }, function(err){
         console.log("I am an error", err);
      })
   }
}]);
