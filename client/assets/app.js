var app = angular.module('myApp', ['angular.filter','ngRoute','ngCookies']);

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
      .when('/area/:id',{
         templateUrl: 'partials/area.html',
      })
      .otherwise({
         redirectTo: '/dashboard'
      })
});