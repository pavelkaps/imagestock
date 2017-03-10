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
                $scope.$apply(function () {
                    console.log(data);
                    $scope.resizingImages = randomResizeImages(data);
                    console.log($scope.resizingImages);
                });
            }).catch(ErrorHandler);

            $scope.openMenu = function ($mdMenu, event) {
                var originatorEv = event;
                $mdMenu.open(event);
            };

            $scope.showConfirmForDelete = function (ev, image) {
                console.log('delete dialog');
                var confirm = $mdDialog.confirm().title('Do you want to delete this image?').targetEvent(ev).ok('Delete').cancel('Cancel');
                $mdDialog.show(confirm).then(function () {
                    $scope.deleteImage(image);
                }, function () {});
            };

            $scope.deleteImage = function (image) {
                console.log(image);
                imageService.deleteImageById(image.id).then(function (data) {

                    if (data.ok === true) {
                        DeleteFromResizingImages(image.id);
                        toaster.pop('info', "Успешно", "Изображение удалено");
                    }
                }).catch(ErrorHandler);
            };

            $scope.toDetail = function (ev, image) {
                console.log(ev);
                detailImageService.setImage(image);
                $mdDialog.show({
                    templateUrl: './app/controllers/image-detail-controller/image-detail-controller.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false
                }).then(function (answer) {}, function () {});
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
                }, function () {
                    console.log('cancel dialog');
                });
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

            function DeleteFromResizingImages(_id) {
                $scope.$apply(function () {
                    $scope.resizingImages = $scope.resizingImages.filter(function (data) {
                        return data.image.id !== _id;
                    });
                });

                console.log($scope.resizingImages);
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
                        own: nickname,
                        text: text,
                        date: Date.now()
                    };

                    imageService.addComment($scope.image.id, comment).then(function (image) {
                        $scope.image.comments.push(comment);
                    }).catch(ErrorHandler);
                } else {
                    toaster.pop('warning', "Ошибка", "Заполните все поля.");
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

            $scope.close = function () {
                $mdDialog.cancel();
            };

            function AddLike(type) {
                imageService.addLike($scope.image.id, {
                    like_type: type,
                    own: USER_ID
                }).then(function (data) {
                    $scope.image.image_likes = data;
                    console.log(data);
                }).catch(ErrorHandler);
            }

            function DeleteLike(imageId, userId) {
                imageService.deleteLike(imageId, userId).then(function (data) {
                    $scope.image.image_likes = data;
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


},{}],9:[function(require,module,exports){
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

var ImageService = function () {
    function ImageService(repository) {
        _classCallCheck(this, ImageService);

        this.repository = repository;
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
        key: 'getById',
        value: function getById(_id) {
            return this.repository.getById(_id);
        }
    }, {
        key: 'deleteImageById',
        value: function deleteImageById(_id) {
            return this.repository.deleteImageById(_id);
        }
    }], [{
        key: 'getInstance',
        value: function getInstance(repository) {
            return new ImageService(repository);
        }
    }]);

    return ImageService;
}();

ImageService.getInstance.$inject = ['imageRepository'];
exports.ImageService = ImageService;


},{}],13:[function(require,module,exports){
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

/**
 * Created by Паша on 10.03.2017.
 */
var HTTP = new WeakMap();
var Q = new WeakMap();

var ImageRepository = exports.ImageRepository = function () {
    function ImageRepository($http, $q) {
        _classCallCheck(this, ImageRepository);

        this.db = new PouchDB('imagesnew');
        HTTP.set(this, $http);
        Q.set(this, $q);
    }

    _createClass(ImageRepository, [{
        key: 'getAll',
        value: function getAll() {
            var _this = this;

            return this.db.allDocs({
                include_docs: true,
                attachments: false
            }).then(function (data) {
                return Q.get(_this).all(data.rows.map(function (row) {
                    return _this.db.getAttachment(row.id, Object.keys(row.doc._attachments)[0]).then(function (data) {
                        return {
                            id: row.id,
                            comments: row.doc.comments,
                            image_likes: row.doc.image_likes,
                            imageUrl: URL.createObjectURL(data)
                        };
                    });
                }));
            });
        }
    }, {
        key: 'put',
        value: function put(image) {
            var _this2 = this;

            var defer = Q.get(this).defer();
            var docId = null;
            this.db.put(image).then(function (data) {
                return _this2.db.get(data.id);
            }).then(function (doc) {
                docId = doc;
                return _this2.db.getAttachment(doc._id, Object.keys(doc._attachments)[0]);
            }).then(function (data) {
                defer.resolve({
                    id: docId._id,
                    comments: docId.comments,
                    image_likes: docId.image_likes,
                    imageUrl: URL.createObjectURL(data)
                });
            });
            return defer.promise;
        }
    }, {
        key: 'addLike',
        value: function addLike(_id, like) {
            var _this3 = this;

            var defer = Q.get(this).defer();
            this.db.get(_id).then(function (doc) {
                _this3.deleteLikeFromDoc(doc, like.own);
                doc.image_likes.push(like);
                _this3.db.put(doc).then(function (data) {
                    defer.resolve(doc.image_likes);
                });
            });
            return defer.promise;
        }
    }, {
        key: 'deleteLike',
        value: function deleteLike(_id, userId) {
            var _this4 = this;

            var defer = Q.get(this).defer();
            this.db.get(_id).then(function (doc) {
                _this4.deleteLikeFromDoc(doc, userId);
                defer.resolve(doc.image_likes);
            });
            return defer.promise;
        }
    }, {
        key: 'deleteLikeFromDoc',
        value: function deleteLikeFromDoc(doc, userId) {
            doc.image_likes.find(function (el, ind, arr) {
                if (el.own === userId) {
                    doc.image_likes.splice(ind, 1);
                    return true;
                }
                return false;
            });
        }
    }, {
        key: 'addComment',
        value: function addComment(_id, comment) {
            var _this5 = this;

            var defer = Q.get(this).defer();
            this.db.get(_id).then(function (doc) {
                doc.comments.push(comment);
                _this5.db.put(doc).then(function (data) {
                    defer.resolve(data);
                });
            });
            return defer.promise;
        }
    }, {
        key: 'deleteComment',
        value: function deleteComment(_id) {}
    }, {
        key: 'getById',
        value: function getById(_id) {
            this.db.get(_id).then(function (doc) {
                console.log(doc);
            });
        }
    }, {
        key: 'deleteImageById',
        value: function deleteImageById(_id) {
            var _this6 = this;

            return this.db.get(_id).then(function (doc) {
                return _this6.db.remove(doc);
            });
        }
    }], [{
        key: 'getInstance',
        value: function getInstance($http, $q) {
            return new ImageRepository($http, $q);
        }
    }]);

    return ImageRepository;
}();

ImageRepository.getInstance.$inject = ['$http', '$q'];


},{}]},{},[4]);
