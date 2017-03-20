(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GUID = GUID;
/**
 * @return {string}
 */
function GUID(count) {
    var guidKey = '';
    for (var i = 0; i < count; i++) {
        guidKey += s4() + s4();
    }
    return guidKey;
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}


},{}],2:[function(require,module,exports){
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

var ImageResizer = exports.ImageResizer = function () {
    function ImageResizer() {
        _classCallCheck(this, ImageResizer);

        this.stylesCardWidth = [{
            width: 'width-1-col'
        }, {
            width: 'width-2-col'
        }];

        this.stylesCardHeight = [{
            height: 'height-1-col'
        }, {
            height: 'height-2-col'
        }];
    }

    _createClass(ImageResizer, [{
        key: 'getWidthSize',
        value: function getWidthSize() {
            var digit = Math.random();

            if (digit < 0.5) {
                return this.stylesCardWidth[0].width;
            } else {
                return this.stylesCardWidth[1].width;
            }
        }
    }, {
        key: 'getHeightSize',
        value: function getHeightSize() {
            var digit = Math.random();
            if (digit < 0.5) {
                return this.stylesCardHeight[0].height;
            } else {
                return this.stylesCardHeight[1].height;
            }
        }
    }]);

    return ImageResizer;
}();


},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RandomFillingImage = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _GUID = require('./GUID');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var RandomFillingImage = exports.RandomFillingImage = function () {
    function RandomFillingImage() {
        _classCallCheck(this, RandomFillingImage);

        this.nicknames = ['Anton', 'Sergey', 'Misha', 'Pasha', 'Sasha', 'Andrey', 'Dasha', 'Masha'];

        this.comments = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id quam eget lorem euismod faucibus eget sed lacus. Proin a sodales sem, eget porta dolor.', 'Proin bibendum turpis ut ante mattis, vitae pulvinar justo porta.', 'Nunc viverra maximus arcu eu mattis.', 'Ut tellus mi, commodo ut purus nec, facilisis venenatis dui.'];
    }

    _createClass(RandomFillingImage, [{
        key: 'setComment',
        value: function setComment(image) {
            var count = Math.floor(Math.random() * (12 - 2)) + 2;
            var comments = [];
            for (var i = 0; i < count; i++) {
                var comment = {
                    id: (0, _GUID.GUID)(2),
                    own: this.nicknames[Math.floor(Math.random() * this.nicknames.length)],
                    text: this.comments[Math.floor(Math.random() * this.comments.length)],
                    date: this.randomDate(new Date(2012, 0, 1), new Date())
                };
                comments.push(comment);
            }
            image.comments = comments;
        }
    }, {
        key: 'setLikes',
        value: function setLikes(image) {
            var count = Math.floor(Math.random() * (12 - 2)) + 2;

            var likes = [];
            for (var i = 0; i < count; i++) {
                var like = {
                    own: (0, _GUID.GUID)(2)
                };
                var o = Math.floor(Math.random() * 10);
                if (o <= 5) {
                    like.like_type = 'like';
                } else if (o > 5) {
                    like.like_type = 'dislike';
                }
                likes.push(like);
            }
            image.image_likes = likes;
        }
    }, {
        key: 'randomDate',
        value: function randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }
    }]);

    return RandomFillingImage;
}();


},{"./GUID":1}],4:[function(require,module,exports){
'use strict';

var _addImageController = require('./controllers/add-image/add-image-controller');

var _galleryController = require('./controllers/gallery-controller/gallery-controller');

var _imageDetailController = require('./controllers/image-detail-controller/image-detail-controller');

var _config = require('./config');

var _detailImage = require('./factory/detail-image');

var _imageFactory = require('./factory/image-factory');

var _reverse = require('./filters/reverse');

var _repeatBrick = require('./directives/repeat-brick');

var _theFreewall = require('./directives/the-freewall');

var _ImageRepository = require('./repository/ImageRepository');

angular.module('ImageGallery', ['ngRoute', 'angularCSS', 'ngMaterial', 'toaster', 'naif.base64', 'angularMoment']).config(_config.Config).controller('AddImageController', _addImageController.AddImageController).controller('GalleryController', _galleryController.GalleryController).controller('ImageDetailController', _imageDetailController.ImageDetailController).factory('detailImageService', _detailImage.DetailImageService.getInstance).factory('imageService', _imageFactory.ImageService.getInstance).factory('imageRepository', _ImageRepository.ImageRepository.getInstance).filter('reverse', _reverse.Reverse).directive('repeatBrick', _repeatBrick.RepeatBrick).directive('theFreewall', _theFreewall.TheFreeWall);


},{"./config":5,"./controllers/add-image/add-image-controller":6,"./controllers/gallery-controller/gallery-controller":7,"./controllers/image-detail-controller/image-detail-controller":8,"./directives/repeat-brick":9,"./directives/the-freewall":10,"./factory/detail-image":11,"./factory/image-factory":12,"./filters/reverse":13,"./repository/ImageRepository":14}],5:[function(require,module,exports){
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


},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddImageController = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _GUID = require('../../additional/GUID');

var _RandomFillingImage = require('../../additional/RandomFillingImage');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var AddImageController = function () {
    function AddImageController($scope, $mdDialog, toaster, imageService) {
        _classCallCheck(this, AddImageController);

        this.init($scope, $mdDialog, toaster, imageService);
    }

    _createClass(AddImageController, [{
        key: 'init',
        value: function init($scope, $mdDialog, toaster, imageService) {
            var _this = this;

            $scope.close = function () {
                $mdDialog.cancel();
            };

            var randomFillingImage = new _RandomFillingImage.RandomFillingImage();

            this.randomLikes = false;
            this.randomComments = false;
            $scope.image = null;

            $scope.addImage = function () {
                if ($scope.image) {
                    var image = {
                        _id: (0, _GUID.GUID)(2),
                        _attachments: $scope.image,
                        image_likes: [],
                        comments: []
                    };
                    if (_this.randomLikes === true) {
                        randomFillingImage.setLikes(image);
                    }
                    if (_this.randomComments === true) {
                        randomFillingImage.setComment(image);
                    }
                    imageService.put(image).then(function (image) {
                        console.log(image);
                        $mdDialog.hide(image);
                        toaster.pop('info', "Успешно", "Изображение добавленно");
                    }).catch(ErrorHandler);
                }
            };

            $scope.onLoad = function (e, reader, file, fileList, fileObjects, fileObj) {
                var attachment = {};
                attachment[fileObj.filename] = {
                    content_type: fileObj.filetype,
                    data: fileObj.base64
                };
                $scope.image = attachment;
            };

            $scope.getImageData = function () {
                if ($scope.image) {
                    return $scope.image[Object.keys($scope.image)[0]];
                }
            };

            $scope.openMenu = function ($mdMenu, event) {
                var originatorEv = event;
                $mdMenu.open(event);
            };

            function ErrorHandler(err) {
                console.log(err);
                toaster.pop('info', "Ошибка", "Произошла ошибка");
            }
        }
    }]);

    return AddImageController;
}();

AddImageController.$inject = ['$scope', '$mdDialog', 'toaster', 'imageService'];
exports.AddImageController = AddImageController;


},{"../../additional/GUID":1,"../../additional/RandomFillingImage":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GalleryController = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _ImageResizer = require('../../additional/ImageResizer');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var GalleryController = function () {
    function GalleryController($scope, imageService, detailImageService, $mdDialog, toaster, $window) {
        _classCallCheck(this, GalleryController);

        this.init($scope, imageService, detailImageService, $mdDialog, toaster, $window);
    }

    _createClass(GalleryController, [{
        key: 'init',
        value: function init($scope, imageService, detailImageService, $mdDialog, toaster, $window) {

            $scope.resizingImages = [];
            $scope.resizer = new _ImageResizer.ImageResizer();

            imageService.getAll().then(function (data) {
                $scope.resizingImages = randomResizeImages(data);
                $scope.$apply();
            }).catch(ErrorHandler);

            $scope.openMenu = function ($mdMenu, event) {
                var originatorEv = event;
                $mdMenu.open(event);
            };

            $scope.showConfirmForDelete = function (ev, image) {
                var confirm = $mdDialog.confirm().title('Do you want to delete this image?').targetEvent(ev).ok('Delete').cancel('Cancel');
                $mdDialog.show(confirm).then(function () {
                    deleteImage(image);
                });
            };

            function deleteImage(image) {
                console.log(image);
                imageService.deleteImageById(image.id).then(function (data) {
                    if (data.ok === true) {
                        DeleteFromResizingImages(image.id);
                        toaster.pop('info', "Успешно", "Изображение удалено");
                        $scope.$apply();
                    }
                }).catch(ErrorHandler);
            };

            $scope.toDetail = function (ev, image) {
                detailImageService.setImage(image);
                $mdDialog.show({
                    templateUrl: './app/controllers/image-detail-controller/image-detail-controller.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false
                });
            };

            $scope.addImage = function (ev) {
                $mdDialog.show({
                    templateUrl: './app/controllers/add-image/add-image-controller.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false
                }).then(function (image) {
                    $scope.resizingImages.push(randomResizeOneImage(image));
                });
            };

            $scope.countActions = function (image, action) {
                return image.image_likes.filter(function (like) {
                    return like.like_type === action;
                }).length;
            };

            function DeleteFromResizingImages(_id) {
                $scope.resizingImages = $scope.resizingImages.filter(function (data) {
                    return data.image.id !== _id;
                });
            }

            function randomResizeImages(data) {
                return data.map(function (data) {
                    return randomResizeOneImage(data);
                });
            }

            function randomResizeOneImage(image) {
                return { width: $scope.resizer.getWidthSize(), height: $scope.resizer.getHeightSize(), image: image };
            }

            function ErrorHandler(err) {
                console.log(err);
                toaster.pop('info', "Ошибка", "Произошла ошибка");
            }
        }
    }]);

    return GalleryController;
}();

GalleryController.$inject = ['$scope', 'imageService', 'detailImageService', '$mdDialog', 'toaster', '$window'];
exports.GalleryController = GalleryController;


},{"../../additional/ImageResizer":2}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageDetailController = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _GUID = require('../../additional/GUID');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var USER_ID = 'user';

var ImageDetailController = function () {
    function ImageDetailController($scope, detailImageService, $mdDialog, toaster, imageService) {
        _classCallCheck(this, ImageDetailController);

        this.init($scope, detailImageService, $mdDialog, toaster, imageService);
    }

    _createClass(ImageDetailController, [{
        key: 'init',
        value: function init($scope, detailImageService, $mdDialog, toaster, imageService) {

            $scope.like = false;
            $scope.dislike = false;

            $scope.image = detailImageService.getImage();
            SetLikeToImage($scope.image);

            $scope.setLike = function () {
                if ($scope.like === false) {
                    AddLike('like');
                }
                if ($scope.dislike === true && $scope.like === false) {
                    $scope.dislike = false;
                } else if ($scope.like === true) {
                    DeleteLike($scope.image.id, USER_ID);
                }
                $scope.like = !$scope.like;
            };

            $scope.setDislike = function () {
                if ($scope.dislike === false) {
                    AddLike('dislike');
                }
                if ($scope.dislike === false && $scope.like === true) {
                    $scope.like = false;
                } else if ($scope.dislike === true) {
                    DeleteLike($scope.image.id, USER_ID);
                }
                $scope.dislike = !$scope.dislike;
            };

            $scope.addComment = function (nickname, text) {
                if ($scope.commentForm.$valid) {
                    $scope.nickname = '';
                    $scope.commentText = '';

                    var comment = {
                        id: (0, _GUID.GUID)(2),
                        own: nickname,
                        text: text,
                        date: Date.now()
                    };

                    imageService.addComment($scope.image.id, comment).then(function (image) {
                        $scope.image.comments.push(comment);
                        $scope.$apply();
                    }).catch(ErrorHandler);
                } else {
                    toaster.pop('warning', "Ошибка", "Заполните все поля.");
                }
            };

            $scope.deleteComment = function (image, comment) {
                imageService.deleteComment(image.id, comment.id).then(function (data) {
                    if (data.ok === true) {
                        $scope.image.comments = image.comments.filter(function (_comment) {
                            return _comment.id !== comment.id;
                        });
                        toaster.pop('info', "Успешно", "Коментарий удален.");
                        $scope.$apply();
                    }
                }).catch(ErrorHandler);
            };

            $scope.countActions = function (image, action) {
                return image.image_likes.filter(function (like) {
                    return like.like_type === action;
                }).length;
            };

            $scope.close = function () {
                $mdDialog.cancel();
            };

            function AddLike(type) {
                imageService.addLike($scope.image.id, {
                    like_type: type,
                    own: USER_ID
                }).then(function (data) {
                    $scope.image.image_likes = data.image_likes;
                    $scope.$apply();
                }).catch(ErrorHandler);
            }

            function DeleteLike(imageId, userId) {
                imageService.deleteLike(imageId, userId).then(function (data) {
                    $scope.image.image_likes = data.image_likes;
                    $scope.$apply();
                }).catch(ErrorHandler);
            }

            function SetLikeToImage(image) {
                image.image_likes.forEach(function (el, ind, arr) {
                    if (el.like_type === 'like' && el.own === USER_ID) {
                        $scope.like = true;
                    } else if (el.like_type === 'dislike' && el.own === USER_ID) {
                        $scope.dislike = true;
                    }
                });
            }

            function ErrorHandler(err) {
                console.log(err);
                toaster.pop('info', "Ошибка", "Произошла ошибка");
            }
        }
    }]);

    return ImageDetailController;
}();

ImageDetailController.$inject = ['$scope', 'detailImageService', '$mdDialog', 'toaster', 'imageService'];
exports.ImageDetailController = ImageDetailController;


},{"../../additional/GUID":1}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function RepeatBrick() {
    return function (scope, element, attrs) {
        console.log('repeat directive');
        if (scope.$last) {
            console.log('last');
            scope.$emit('LastBrick');
        }
    };
}

exports.RepeatBrick = RepeatBrick;


},{}],10:[function(require,module,exports){
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
                selector: '.image-card',
                animate: true,
                cellW: 238,
                cellH: 190,
                gutterX: 10,
                gutterY: 10,
                onResize: function onResize() {
                    wall.fitHeight(590);
                }
            });

            scope.wall = wall;
            wall.container.find('.card').on('load', function () {
                wall.fitHeight(590);
            });
            $window.dispatchEvent(new Event('resize'));
        });
    };
}

TheFreeWall.$inject = ['$window'];
exports.TheFreeWall = TheFreeWall;


},{}],11:[function(require,module,exports){
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


},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageService = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _ImageRepository = require('../repository/ImageRepository');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var ImageService = function () {
    function ImageService() {
        _classCallCheck(this, ImageService);

        this.repository = new _ImageRepository.ImageRepository();
    }

    _createClass(ImageService, [{
        key: 'getAll',
        value: function getAll() {
            return this.repository.getAll();
        }
    }, {
        key: 'put',
        value: function put(image) {
            return this.repository.put(image);
        }
    }, {
        key: 'addLike',
        value: function addLike(_id, like) {
            return this.repository.addLike(_id, like);
        }
    }, {
        key: 'deleteLike',
        value: function deleteLike(_id, userId) {
            return this.repository.deleteLike(_id, userId);
        }
    }, {
        key: 'addComment',
        value: function addComment(_id, comment) {
            return this.repository.addComment(_id, comment);
        }
    }, {
        key: 'deleteComment',
        value: function deleteComment(idImage, idComment) {
            return this.repository.deleteComment(idImage, idComment);
        }
    }, {
        key: 'deleteImageById',
        value: function deleteImageById(_id) {
            return this.repository.deleteImageById(_id);
        }
    }], [{
        key: 'getInstance',
        value: function getInstance() {
            return new ImageService();
        }
    }]);

    return ImageService;
}();

exports.ImageService = ImageService;


},{"../repository/ImageRepository":14}],13:[function(require,module,exports){
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


},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }return arr2;
    } else {
        return Array.from(arr);
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * Created by Паша on 10.03.2017.
 */
var ImageRepository = exports.ImageRepository = function () {
    function ImageRepository() {
        _classCallCheck(this, ImageRepository);

        this.db = new PouchDB('imagesnew');
    }

    _createClass(ImageRepository, [{
        key: "getAll",
        value: function getAll() {
            var _this = this;

            return this.db.allDocs({
                include_docs: true,
                attachments: false
            }).then(function (data) {
                return Promise.all(data.rows.map(function (row) {
                    return _this.db.getAttachment(row.id, Object.keys(row.doc._attachments)[0]).then(function (data) {
                        return {
                            id: row.id,
                            comments: row.doc.comments,
                            image_likes: row.doc.image_likes,
                            imageUrl: URL.createObjectURL(data)
                        };
                    });
                })).catch(function (err) {
                    console.log(err);
                });
            });
        }
    }, {
        key: "put",
        value: function put(image) {
            var _this2 = this;

            return this.db.put(image).then(function (data) {
                return _this2.db.get(data.id);
            }).then(function (doc) {
                return _this2.db.getAttachment(doc._id, Object.keys(doc._attachments)[0]).then(function (attachment) {
                    return {
                        id: doc._id,
                        comments: doc.comments,
                        image_likes: doc.image_likes,
                        imageUrl: URL.createObjectURL(attachment)
                    };
                });
            });
        }
    }, {
        key: "addLike",
        value: function addLike(_id, like) {
            var _this3 = this;

            return this.db.get(_id).then(function (doc) {
                var image = _extends({}, doc, { image_likes: [].concat(_toConsumableArray(doc.image_likes.filter(function (_like) {
                        return _like.own !== like.own;
                    })), [like]) });
                return _this3.db.put(image).then(function (res) {
                    return image;
                });
            });
        }
    }, {
        key: "deleteLike",
        value: function deleteLike(_id, userId) {
            var _this4 = this;

            return this.db.get(_id).then(function (doc) {
                console.log(doc, "doc");
                var image = _extends({}, doc, { image_likes: doc.image_likes.filter(function (like) {
                        return like.own !== userId;
                    }) });
                console.log(image, "image");
                return _this4.db.put(image).then(function (res) {
                    return image;
                });
            });
        }
    }, {
        key: "addComment",
        value: function addComment(_id, comment) {
            var _this5 = this;

            return this.db.get(_id).then(function (doc) {
                var image = _extends({}, doc, { comments: [].concat(_toConsumableArray(doc.comments), [comment]) });
                return _this5.db.put(image);
            });
        }
    }, {
        key: "deleteComment",
        value: function deleteComment(idImage, commentId) {
            var _this6 = this;

            return this.db.get(idImage).then(function (doc) {
                var image = _extends({}, doc, { comments: doc.comments.filter(function (comment) {
                        return comment.id !== commentId;
                    }) });
                return _this6.db.put(image);
            });
        }
    }, {
        key: "deleteImageById",
        value: function deleteImageById(_id) {
            var _this7 = this;

            return this.db.get(_id).then(function (doc) {
                return _this7.db.remove(doc);
            });
        }
    }]);

    return ImageRepository;
}();


},{}]},{},[4]);
