angular.module('myApp')  
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'chat.html'
      })
       
      .otherwise({
        redirectTo: '/'
      });
  })