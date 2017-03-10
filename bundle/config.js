'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function Config($routeProvider, $locationProvider, $mdIconProvider) {
    $routeProvider.when('/', {
        redirectTo: '/gallery'
    }).when('/gallery', {
        templateUrl: 'app/controllers/gallery-controller/gallery-controller.html',
        controller: 'GalleryController'
    }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
    $mdIconProvider.iconSet('delete', 'assets/svg/delete.svg', 24);
}
Config.$inject = ['$routeProvider', '$locationProvider', '$mdIconProvider'];
exports.Config = Config;
//# sourceMappingURL=config.js.map
