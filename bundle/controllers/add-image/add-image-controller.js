'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddImageController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GUID = require('../../additional/GUID');

var _RandomFillingImage = require('../../additional/RandomFillingImage');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
                    imageService.put(image).subscribe(function (image) {
                        console.log(image);
                        $mdDialog.hide(image);
                        toaster.pop('info', "Успешно", "Изображение добавленно");
                    }, ErrorHandler);
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
//# sourceMappingURL=add-image-controller.js.map
