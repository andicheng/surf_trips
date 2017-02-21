app.controller('tripController', ['$scope','usersFactory','tripsFactory', '$location','$routeParams', '$route', function($scope, usersFactory, tripsFactory, $location, $routeParams, $route) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
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
            alert(data.data.message);
         }else{
            $scope.post = {};
            $route.reload();
         }
      })
   }
   $scope.newComment = function(id, comment){
      tripsFactory.newComment(id, comment, function(data){
         console.log(id, comment)
         if(data.data.errors){
            $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.comment = {};
            $route.reload();
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
            $route.reload();
         }else{
            $scope.report = {};
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.testuser = function(){
      if(!$scope.user){
         alert("Please register or login to post comments")
         console.log('test')
      }else{
         console.log('Clicked')
      }
   }
   $scope.reply = false;
   $scope.reporttrip = false;
   $scope.reportpost = false;
   $scope.reportcomment = false;
}]);
