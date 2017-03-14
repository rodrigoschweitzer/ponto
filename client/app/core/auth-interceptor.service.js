(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('AuthInterceptor', AuthInterceptor);

        AuthInterceptor.$inject = ['$q', '$cookieStore', '$location'];

        function AuthInterceptor($q, $cookieStore, $location) {
            return {
                // Add authorization token to headers
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($cookieStore.get('token')) {
                        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                    }
                    return config;
                },

                // Intercept 401s and redirect you to login
                responseError: function(response) {
                    if(response.status === 401) {
                        $location.path('/login');
                        // remove any stale tokens
                        $cookieStore.remove('token');
                    } if (response.status === 403) {
                        $location.path('/login');
                    }

                    return $q.reject(response);
                }
            };
        }
})();