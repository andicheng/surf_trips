app.factory('tripsFactory', ['$http','$location', function($http, $location) {
   var factory = {};
   factory.getTrips = function(callback){
      $http.get('/trips').then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
      })
   };
   factory.newTrip = function(trip, callback){
      $http.post('/newTrip', trip).then(function(res){
         callback(res);
      })
   };
   factory.getAreaTrips = function(area, callback){
      $http.get('/areaTrips/'+area).then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
      })
   };
   factory.newPost = function(id, post, callback){
      $http.post('/newPost/'+id, post).then(function(res){
         callback(res);
      })
   };
   return factory;
}]);
