app.controller('regionsController', ['$scope','usersFactory','tripsFactory', '$location','$routeParams', function($scope, usersFactory, tripsFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getTrips = function(){
   tripsFactory.getTrips(function(returned_data){
      $scope.trips = returned_data;
      console.log($scope.trips);
      var regions=[];
      for(var i=0; i<$scope.trips.length; i++){
         var sum=0;
         var count=0;
         var region = $scope.trips[i].region;
         for(var j=i; j<$scope.trips.length; j++){
            if($scope.trips[j].region == region){
               sum+=$scope.trips[j].rating;
               count++
            }
         }
         var found = regions.some(function (el) {
            return el.region == region;
         });
         if (!found) {
            regions.push({region: region, count: count, averageRating: Math.round(sum/count*10)/10})
         }
      }
      var countries=[];
      for(var i=0; i<$scope.trips.length; i++){
         var sum2=0;
         var count2=0;
         var country = $scope.trips[i].country;
         for(var j=i; j<$scope.trips.length; j++){
            if($scope.trips[j].country == country){
               sum2+=$scope.trips[j].rating;
               count2++;
            }
         }
         var found = countries.some(function (el) {
            return el.country == country;
         });
         if (!found) {
            countries.push({country: country, count: count2, averageRating: Math.round(sum2/count2*10)/10})
         }
      }
      $scope.countries = countries;
      $scope.regions = regions;
   })};
   getTrips();
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   };
}]);
