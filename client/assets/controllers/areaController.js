app.controller('areaController', ['$scope','usersFactory','tripsFactory', 'postsFactory', '$location','$routeParams', function($scope, usersFactory, tripsFactory, postsFactory,$location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getAreaTrips = function(){
   tripsFactory.getAreaTrips($routeParams.id, function(returned_data){
      $scope.trips = returned_data;
   })};
   getAreaTrips()
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
}]);
