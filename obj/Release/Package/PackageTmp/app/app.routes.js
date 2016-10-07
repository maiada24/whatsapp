angular.module('myApp')  
  .config(function ($routeProvider) {
    $routeProvider
      .when('/chatDetails', {
          templateUrl: 'chatDetails.html',
          controller: 'chatDetailsCtrl'
      }).when('/conversations', {
          templateUrl: 'conversations.html',
          controller: 'conversationsCtrl'
      })

  })


