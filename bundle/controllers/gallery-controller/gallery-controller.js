'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GalleryController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ImageResizer = require('../../additional/ImageResizer');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GalleryController = function () {
    function GalleryController($scope, imageService, detailImageService, $mdDialog, toaster, $window) {
        _classCallCheck(this, GalleryController);

        this.init($scope, imageService, detailImageService, $mdDialog, toaster, $window);
    }

    _createClass(GalleryController, [{
        key: 'init',
        value: function init($scope, imageService, detailImageService, $mdDialog, toaster, $window) {

            toaster.pop({
                timeout: 20000,
                showCloseButton: true,
                limit: 5
            });

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
                /* $scope.resizingImages.find((el, index, arr)=> {
                     if (el.image.id === _id) {
                         $scope.resizingImages.splice(index, 1);
                         return true;
                     }
                     return false;
                 });*/
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
//# sourceMappingURL=gallery-controller.js.map
