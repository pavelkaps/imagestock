'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
//# sourceMappingURL=image-detail-controller.js.map
