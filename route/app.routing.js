/**
 * Created by Паша on 21.10.2016.
 */
(function () {
    angular.module('ImageGallery').
    config(['$resourceProvider','$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/',{
            redirectTo: '/gallery'
        })
        .when('/gallery', {
            templateUrl: 'controllers/gallery-controller/gallery-controller.html',
            controller: 'GalleryController'
        }).otherwise({
            redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
}]);

})();
