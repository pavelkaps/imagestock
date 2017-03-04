(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _addImageController = require('./controllers/add-image/add-image-controller');

var _galleryController = require('./controllers/gallery-controller/gallery-controller');

var _imageDetailController = require('./controllers/image-detail-controller/image-detail-controller');

var _app = require('./route/app.routing');

var _detailImage = require('./factory/detail-image');

var _imageFactory = require('./factory/image-factory');

var _reverse = require('./filters/reverse');

var _repeatBrick = require('./directives/repeat-brick');

var _theFreewall = require('./directives/the-freewall');

angular.module('ImageGallery', ['ngRoute', 'angularCSS', 'ngMaterial']).config(_app.Config).controller('AddImageController', _addImageController.AddImageController).controller('GalleryController', _galleryController.GalleryController).controller('ImageDetailController', _imageDetailController.ImageDetailController).factory('detailImageService', _detailImage.DetailImageService.getInstance).factory('imageService', _imageFactory.ImageService.getInstance).filter('reverse', _reverse.Reverse).directive('repeatBrick', _repeatBrick.RepeatBrick).directive('theFreewall', _theFreewall.TheFreeWall);


},{"./controllers/add-image/add-image-controller":2,"./controllers/gallery-controller/gallery-controller":3,"./controllers/image-detail-controller/image-detail-controller":4,"./directives/repeat-brick":5,"./directives/the-freewall":6,"./factory/detail-image":7,"./factory/image-factory":8,"./filters/reverse":9,"./route/app.routing":10}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var AddImageController = function () {
    function AddImageController($scope, $mdDialog) {
        _classCallCheck(this, AddImageController);

        this.init($scope, $mdDialog);
    }

    _createClass(AddImageController, [{
        key: 'init',
        value: function init($scope, $mdDialog) {
            $scope.close = function () {
                $mdDialog.cancel();
            };

            $scope.addImage = function (imageUrl) {
                $mdDialog.hide(imageUrl);
            };

            $scope.$watch('imageUrl', function () {}, true);
        }
    }]);

    return AddImageController;
}();

AddImageController.$inject = ['$scope', '$mdDialog'];
exports.AddImageController = AddImageController;


},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var GalleryController = function () {
    function GalleryController($scope, imageService, detailImageService, $mdDialog) {
        _classCallCheck(this, GalleryController);

        this.init($scope, imageService, detailImageService, $mdDialog);
    }

    _createClass(GalleryController, [{
        key: 'init',
        value: function init($scope, imageService, detailImageService, $mdDialog) {
            $scope.resizingImages = [];

            $scope.stylesCardWidth = [{
                width: 'width-1-col'
            }, {
                width: 'width-2-col'
            }];

            $scope.stylesCardHeight = [{
                height: 'height-1-col'
            }, {
                height: 'height-2-col'
            }];

            function getWidthSize() {
                var digit = Math.random();

                if (digit < 0.5) {
                    return $scope.stylesCardWidth[0].width;
                } else {
                    return $scope.stylesCardWidth[1].width;
                }
            };

            function getHeightSize() {
                var digit = Math.random();
                if (digit < 0.5) {
                    return $scope.stylesCardHeight[0].height;
                } else {
                    return $scope.stylesCardHeight[1].height;
                }
            };

            imageService.getAll().then(function (data) {
                $scope.resizingImages = randomResizeImages(data.data);
            }, function (err) {
                console.log(err);
            });

            function randomResizeImages(data) {
                return data.map(function (data) {
                    return { width: getWidthSize(), height: getHeightSize(), image: data };
                });
            }

            function randomResizeOneImage(image) {
                return { width: getWidthSize(), height: getHeightSize(), image: image };
            }

            $scope.toDetail = function (ev, image) {
                detailImageService.setImage(image);
                $mdDialog.show({
                    templateUrl: './app/controllers/image-detail-controller/image-detail-controller.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false
                }).then(function (answer) {}, function () {
                    console.log('cancel dialog');
                });
            };

            $scope.addImage = function (ev) {
                $mdDialog.show({
                    templateUrl: './app/controllers/add-image/add-image-controller.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false
                }).then(function (imageUrl) {
                    createImage(imageUrl);
                }, function () {
                    console.log('cancel dialog');
                });
            };

            function createImage(imageUrl) {
                var image = {
                    image_url: imageUrl,
                    image_likes: [],
                    comments: []
                };

                $scope.resizingImages.push(randomResizeOneImage(image));
            }

            $scope.countActions = function (image, action) {
                var count = 0;
                image.image_likes.forEach(function (el, ind, arr) {
                    if (el.like_type === action) {
                        count++;
                    }
                });
                return count;
            };
        }
    }]);

    return GalleryController;
}();

GalleryController.$inject = ['$scope', 'imageService', 'detailImageService', '$mdDialog'];
exports.GalleryController = GalleryController;


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var ImageDetailController = function () {
    function ImageDetailController($scope, detailImageService, $mdDialog) {
        _classCallCheck(this, ImageDetailController);

        this.init($scope, detailImageService, $mdDialog);
    }

    _createClass(ImageDetailController, [{
        key: 'init',
        value: function init($scope, detailImageService, $mdDialog) {
            $scope.like = false;
            $scope.dislike = false;

            $scope.image = detailImageService.getImage();

            $scope.setLike = function () {
                $scope.like = !$scope.like;
            };

            $scope.setDislike = function () {
                $scope.dislike = !$scope.dislike;
            };

            $scope.close = function () {
                $mdDialog.cancel();
            };

            $scope.addComment = function (nickname, text) {
                if ($scope.commentForm.$valid) {
                    var comment = {};
                    comment.own = nickname;
                    comment.text = text;
                    comment.data = Date.now();

                    $scope.nickname = '';
                    $scope.commentText = '';
                    $scope.image.comments.push(comment);
                }
            };

            $scope.countActions = function (image, action) {
                var count = 0;
                image.image_likes.forEach(function (el, ind, arr) {
                    if (el.like_type === action) {
                        count++;
                    }
                });
                return count;
            };
        }
    }]);

    return ImageDetailController;
}();

ImageDetailController.$inject = ['$scope', 'detailImageService', '$mdDialog'];
exports.ImageDetailController = ImageDetailController;


},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function RepeatBrick() {
    return function (scope, element, attrs) {
        if (scope.$last) {
            console.log("emmit");
            scope.$emit('LastBrick');
        }
    };
}

exports.RepeatBrick = RepeatBrick;


},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function TheFreeWall($window) {
    return function (scope, element, attrs) {
        scope.$on('LastBrick', function (event) {
            var wall = new Freewall(".galleryGrid");
            console.log("directive");
            wall.reset({
                selector: '.card',
                animate: true,
                cellW: 238,
                cellH: 190,
                gutterX: 10,
                gutterY: 10,
                onResize: function onResize() {
                    wall.fitHeight(590);
                }

            });

            wall.container.find('.card').on('load', function () {
                wall.fitHeight(590);
            });

            $window.dispatchEvent(new Event('resize'));
        });
    };
}

TheFreeWall.$inject = ['$window'];
exports.TheFreeWall = TheFreeWall;


},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var DetailImageService = function () {
    function DetailImageService() {
        _classCallCheck(this, DetailImageService);

        this.image = null;
    }

    _createClass(DetailImageService, [{
        key: "setImage",
        value: function setImage(_image) {
            this.image = _image;
        }
    }, {
        key: "getImage",
        value: function getImage() {
            return this.image;
        }
    }], [{
        key: "getInstance",
        value: function getInstance() {
            return new DetailImageService();
        }
    }]);

    return DetailImageService;
}();

exports.DetailImageService = DetailImageService;


},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var HTTP = new WeakMap();

var ImageService = function () {
    function ImageService($http) {
        _classCallCheck(this, ImageService);

        this.imageApiURL = "./mock-data/images.json";
        HTTP.set(this, $http);
    }

    _createClass(ImageService, [{
        key: "getAll",
        value: function getAll() {
            return HTTP.get(this).get(this.imageApiURL);
        }
    }], [{
        key: "getInstance",
        value: function getInstance($http) {
            return new ImageService($http);
        }
    }]);

    return ImageService;
}();

ImageService.getInstance.$inject = ['$http'];
exports.ImageService = ImageService;


},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function Reverse() {
    return function (items) {
        return items.slice().reverse();
    };
}

exports.Reverse = Reverse;


},{}],10:[function(require,module,exports){
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


},{}]},{},[1]);
