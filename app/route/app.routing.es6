class Config {
    constructor($routeProvider, $locationProvider) {
        this.init($routeProvider, $locationProvider);
    }

    init($routeProvider, $locationProvider) {
        $routeProvider
            .when('/',{
                redirectTo: '/gallery'
            })
            .when('/gallery', {
                templateUrl: 'app/controllers/gallery-controller/gallery-controller.html',
                controller: 'GalleryController'
            }).otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }
}
Config.$inject = ['$routeProvider','$locationProvider'];
export {Config}

