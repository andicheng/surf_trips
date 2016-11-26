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
      // var areas=[];
      // for(var i=0; i<$scope.trips.length; i++){
      //    var sum=0;
      //    var count=0;
      //    var area = $scope.trips[i].area;
      //    for(var j=i; j<$scope.trips.length; j++){
      //       if($scope.trips[j].area == area){
      //          sum+=$scope.trips[j].rating;
      //          count++;
      //       }
      //    }
      //    var found = areas.some(function (el) {
      //       return el.area == area;
      //    });
      //    if (!found) {
      //       areas.push({area: area, count: count, averageRating: Math.round(sum/count*10)/10})
      //    }
      // }
      // $scope.areas = areas;
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
