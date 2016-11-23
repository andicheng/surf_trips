app.controller('postsController', ['$scope','postsFactory','usersFactory', '$location','$routeParams', function($scope,  postsFactory, usersFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
      $location.url('/dashboard')
   });
   var getPosts = function(){
   postsFactory.getPosts(function(returned_data){
      console.log(returned_data)
      $scope.posts = returned_data.data;
   })};
   getPosts()
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
         $location.url('/login')
      });
      $location.url('/login')
   }
   $scope.newPost = function(id){
      postsFactory.newPost(id, $scope.post, function(data){
         if(data.data.errors){
            $scope.errors = data.data.errors;
         }else{
            $scope.post = {};
            getPosts();
         }
      })
   }
   $scope.newComment = function(id, comment){
      postsFactory.newComment(id, comment, function(data){
         if(data.data.errors){
            $scope.errors = data.data.errors;
         }else{
            $scope.comment = {};
            getPosts();
         }
      })
   }
}]);
