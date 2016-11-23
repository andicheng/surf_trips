app.factory('postsFactory', ['$http','$location', function($http, $location) {
   var factory = {};
   factory.getPosts = function(callback){
      $http.get('/posts').then(function(returned_data){
         callback(returned_data);
      })
   };
   factory.getUser = function(callback){
      $http.get('/currentUser').then(function(returned_data){
         console.log(returned_data)
         callback(returned_data.data);
      })
   };
   factory.logout = function(callback){
      $http.get('/logout').then(function(res){
         callback(res);
      })
   };
   factory.newPost = function(id, post, callback){
      $http.post('/newPost/'+id, post).then(function(res){
         callback(res);
      })
   };
   factory.newComment = function(id, comment, callback){
      $http.post('/newComment/'+id, comment).then(function(res){
         callback(res);
      })
   };
   // factory.delete = function(user){
   //    $http.delete('/users/'+user).then(function(){
   //       console.log("user deleted")
   //    });
   // }
   return factory;
}]);
