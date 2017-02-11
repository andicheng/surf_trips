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
      $scope.url = $location.absUrl();
   })};
   getRegionTrips()
   var getTrip = function(){
      tripsFactory.getTrip($routeParams.id, function(returned_data){
         $scope.trip = returned_data;
      })
   }
   getTrip()
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
            getRegionTrips();
         }
      })
   }
   $scope.reportcomments = function(comment, report){
      var req = Object.assign({}, comment, report);
      console.log(req);
      tripsFactory.reportcomments(req, function(data){
         if(data.data.errors){
            $scope.report = {};
            $scope.errors = data.data.errors;
            alert(data.data.errors.login.message);
         }else{
            $scope.report = {};
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.reply = false;
   $scope.reporttrip = false;
   $scope.reportpost = false;
   $scope.reportcomment = false;
}]);
