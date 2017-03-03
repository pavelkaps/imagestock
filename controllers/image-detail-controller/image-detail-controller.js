/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    angular.module('ImageGallery')
        .controller('ImageDetailController', ['$scope', 'imageService', 'detailImageService', '$mdDialog', function ($scope, imageService, detailImageService, $mdDialog) {

            $scope.like = false;
            $scope.dislike = false;

            $scope.image = detailImageService.getImage();

            $scope.setLike = function () {
                $scope.like = !$scope.like;
            };

            $scope.setDislike = function () {
                $scope.dislike = !$scope.dislike;
            };

            $scope.close = function() {
                $mdDialog.cancel();
            };

            $scope.addComment = function (nickname, text) {
                if($scope.commentForm.$valid){
                    var comment = {};
                    comment.own = nickname;
                    comment.text = text;
                    comment.data = Date.now();

                    $scope.image.comments.push(comment);
                }
            };

        }]);
})();
