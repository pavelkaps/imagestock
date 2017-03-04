'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function Config($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        redirectTo: '/gallery'
    }).when('/gallery', {
        templateUrl: 'app/controllers/gallery-controller/gallery-controller.html',
        controller: 'GalleryController'
    }).otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
}
Config.$inject = ['$routeProvider', '$locationProvider'];
exports.Config = Config;
//# sourceMappingURL=app.routing.js.map
