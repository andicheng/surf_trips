app.controller('regionsController', ['$scope','usersFactory','tripsFactory', '$location','$routeParams', function($scope, usersFactory, tripsFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getTrips = function(){
   tripsFactory.getTrips(function(returned_data){
      $scope.trips = returned_data;
      console.log($scope.trips);
      for(var j=0; j<$scope.trips.length; j++){
         var sum = 0
         for(var i=0; i<$scope.trips.region.length; i++){
            sum += $scope.trips[j].region[i].rating;
         }
         var averageRating = sum/$scope.trips.region[j].length;
         $scope.trips.region[j].count = $scope.trips.region[j].length;
         $scope.trips.region[j].averageRating = Math.round(averageRating*10)/10;
      }
      console.log($scope.trips);
   })};
   getTrips()
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   }
}]);
