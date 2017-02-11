app.controller('regionsController', ['$scope','usersFactory','tripsFactory', '$location','$routeParams', function($scope, usersFactory, tripsFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getTrips = function(){
   tripsFactory.getTrips(function(returned_data){
      $scope.trips = returned_data;
      var trips = $scope.trips
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
         var found = regions.some(function (regions) {
            return regions.region == region;
         });
         if (!found) {
            regions.push({region: region, count: count, averageRating: Math.round(sum/count*10)/10})
         }
      };
      var countries=[];
      for(var y=0; y<$scope.trips.length; y++){
         var sum2=0;
         var count2=0;
         var country = $scope.trips[y].country;
         for(var z=y; z<$scope.trips.length; z++){
            if($scope.trips[z].country == country){
               sum2+=$scope.trips[z].rating;
               count2++;
            }
         }
         var found2 = countries.some(function (countries) {
            return countries.country2 == country;
         });
         if (!found2) {
            countries.push({country2: country, count: count2, averageRating: Math.round(sum2/count2*10)/10})
         }
         // trips[y].push("$scope.trips[y].region$scope.trips[y].country");
      };
      $scope.countries = countries;
      console.log($scope.trips);
      console.log(countries);
      console.log(regions);
      $scope.regions = regions;
      $scope.url = $location.absUrl();
   })};
   getTrips();
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   };
}]);
