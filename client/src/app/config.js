(function () {
  'use strict';

  angular
      .module('meanStackApp')
      .constant('CONFIG', {
        backendUrl: 'http://mean-app.local:9000',
        pagination: {
          pageSize: 10
        }
      })
      .config(function ($stateProvider) {
        $stateProvider
            .state('app', {
              abstract: true,
              url: '/',
              templateUrl: 'app/app.html',
              controller : 'AppCtrl'
            });
      })
      .config(function ($httpProvider) {
        // $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push(function ($q, $injector) {
          return {
            responseError: function (response) {
              var $state = $injector.get('$state');
              switch (parseInt(response.status, 10)) {
                case 401:
                  // @TODO: go to sign-in
                  break;
                case 403:
                  // @TODO: forbidden
                  break;
                case 404:
                  // @TODO: not fount
              }

              return $q.reject(response);
            }
          };
        });
      })
      .run(function ($rootScope) { });

})();
