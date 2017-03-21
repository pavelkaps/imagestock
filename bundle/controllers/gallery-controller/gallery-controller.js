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

            $scope.resizingImages = [];
            $scope.resizer = new _ImageResizer.ImageResizer();

            imageService.getAll().subscribe(function (data) {
                console.log(data);
                $scope.resizingImages = randomResizeImages(data);
                $scope.$apply();
            });

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
                imageService.deleteImageById(image.id).subscribe(function (data) {
                    if (data.ok === true) {
                        DeleteFromResizingImages(image.id);
                        toaster.pop('info', "Успешно", "Изображение удалено");
                        $scope.$apply();
                    }
                }, ErrorHandler);
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
//# sourceMappingURL=gallery-controller.js.map
