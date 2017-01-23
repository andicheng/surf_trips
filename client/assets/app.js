var app = angular.module('myApp',['djds4rce.angular-socialshare','ui.filters','angular.filter','ngRoute','ngCookies']);

app.factory('loginInterceptor', ['$q','$location', function($q, $location) {
   return{
      'responseError': function(rejection){
         if(rejection.status == 401){
            $location.url('/login');
         }
         return $q.reject(rejection);
      }
   }
}])

app.config(function($routeProvider, $httpProvider){
   $httpProvider.interceptors.push('loginInterceptor');
   $routeProvider
      .when('/',{
         templateUrl: 'partials/welcome.html',
      })
      .when('/login',{
         templateUrl: 'partials/login.html',
      })
      .when('/register',{
         templateUrl: 'partials/registration.html',
      })
      .when('/dashboard',{
         templateUrl: 'partials/dashboard.html',
      })
      .when('/country/:id',{
         templateUrl: 'partials/country.html',
      })
      .when('/area/:id',{
         templateUrl: 'partials/area.html',
      })
      .when('/region/:id',{
         templateUrl: 'partials/region.html',
      })
      .when('/regions',{
         templateUrl: 'partials/regions.html',
      })
      .when('/user/:id',{
         templateUrl: 'partials/user.html',
      })
      .otherwise({
         redirectTo: '/dashboard'
      })
});
