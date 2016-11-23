app.controller('dashboardController', ['$scope','usersFactory','tripsFactory', '$location','$routeParams', function($scope, usersFactory, tripsFactory,$location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getTrips = function(){
   tripsFactory.getTrips(function(returned_data){
      console.log(returned_data);
      $scope.trips = returned_data;
   })};
   getTrips()
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   }
   $scope.newTrip = function(){
      console.log($scope.myTrip);
      tripsFactory.newTrip($scope.myTrip, function(data){
         if(data.data.errors){
            $scope.errors = data.data.errors;
         }else{
            $scope.myTrip = {};
            getTrips();
         }
      })
   }
   $scope.show = function(){
      usersFactory.show($routeParams.user, function(data){
         $scope.user = data;
      });
   }
}]);
