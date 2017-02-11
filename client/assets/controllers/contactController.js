app.controller('contactController', ['$scope','tripsFactory', '$location','$routeParams', function($scope, tripsFactory, $location, $routeParams) {

   $scope.sendcontact = function(contact){
      tripsFactory.contact($scope.contact, function(data){
         if(data.data.errors){
            $scope.errors = data.data.errors;
            $scope.contact = {};
         }else{
            $scope.contact = {};
         }
      }, function(err){
         console.log("I am an error", err);
      })
   }
}]);
