app.factory('tripsFactory', ['$http','$location', function($http, $location) {
   var factory = {};
   factory.getTrips = function(callback){
      $http.get('/trips').then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
      })
   };
   factory.getUser = function(callback){
      $http.get('/currentUser').then(function(returned_data){
         console.log(returned_data)
         callback(returned_data.data);
      })
   };
   factory.contact = function(contact, callback, errback){
      $http.post('/contact', contact).then(function(res){
         console.log(contact)
         callback(res);
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
   factory.getCountryTrips = function(country, callback){
      $http.get('/countryTrips/'+country).then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
      })
   };
   factory.getRegionTrips = function(region, callback){
      $http.get('/regionTrips/'+region).then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
      })
   };
   factory.getregionCountryTrips = function(region, country, callback){
      $http.get('/regionCountryTrips/'+region+'/'+country).then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
      })
   };
   factory.getTrip = function(trip, callback){
      $http.get('/trip/'+trip).then(function(returned_data){
         trip = returned_data.data;
         callback(trip);
      })
   };
   factory.getUserTrips = function(user, callback){
      $http.get('/userTrips/'+user).then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
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
   factory.reportcomments = function(req, callback){
      $http.post('/reportcomments', req).then(function(res){
         callback(res);
      })
   };
   factory.logout = function(callback){
      $http.get('/logout').then(function(res){
         callback(res);
      })
   };
   return factory;
}]);
