'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function () {
    function Config($routeProvider, $locationProvider) {
        _classCallCheck(this, Config);

        this.init($routeProvider, $locationProvider);
    }

    _createClass(Config, [{
        key: 'init',
        value: function init($routeProvider, $locationProvider) {
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
    }]);

    return Config;
}();

Config.$inject = ['$routeProvider', '$locationProvider'];
exports.Config = Config;
//# sourceMappingURL=app.routing.js.map
