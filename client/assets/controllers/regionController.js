app.controller('regionController', ['$scope','usersFactory','tripsFactory', '$location','$routeParams', function($scope, usersFactory, tripsFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getRegionTrips = function(){
   tripsFactory.getRegionTrips($routeParams.id, function(returned_data){
      console.log(returned_data)
      $scope.trips = returned_data;
      var sum = 0
      for(var i=0; i<$scope.trips.length; i++){
         sum += $scope.trips[i].rating;
      }
      var averageRating = sum/$scope.trips.length;
      $scope.trips.count = $scope.trips.length;
      $scope.trips.region = $routeParams.id;
      $scope.trips.averageRating = Math.round(averageRating*10)/10;
   })};
   getRegionTrips()
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   }
   $scope.newPost = function(id, post){
      tripsFactory.newPost(id, post, function(data){
         console.log(id, post)
         if(data.data.errors){
            $scope.errors = data.data.errors;
         }else{
            $scope.post = {};
            getAreaTrips();
         }
      })
   }
   $scope.newComment = function(id, comment){
      tripsFactory.newComment(id, comment, function(data){
         console.log(id, comment)
         if(data.data.errors){
            $scope.errors = data.data.errors;
         }else{
            $scope.comment = {};
            getAreaTrips();
         }
      })
   }
   $scope.reply = false;
}]);
