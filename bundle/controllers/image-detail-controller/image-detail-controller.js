'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageDetailController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GUID = require('../../additional/GUID');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
                    }).catch(ErrorHandler);
                } else {
                    toaster.pop('warning', "Ошибка", "Заполните все поля.");
                }
            };

            $scope.deleteComment = function (image, comment) {
                imageService.deleteComment(image.id, comment.id).then(function (data) {
                    if (data.ok === true) {
                        image.comments.find(function (el, index, arr) {
                            if (el.id === comment.id) {
                                image.comments.splice(index, 1);
                                return true;
                            }
                            return false;
                        });
                        toaster.pop('info', "Успешно", "Коментарий удален.");
                        $scope.$apply();
                    }
                }).catch(ErrorHandler);
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
//# sourceMappingURL=image-detail-controller.js.map
