(function () {
    'use strict';

    angular
        .module('app.core')
        .run(function ($rootScope, $location, Auth) {
            // Redirect to login if route requires auth and you're not logged in
            $rootScope.$on('$stateChangeStart', function (event, next) {
                Auth.isLoggedInAsync(function(loggedIn) {
                    if (next.authenticate && !loggedIn) {
                        $location.path('/login');
                    }
                });
            });
        });
        
})();