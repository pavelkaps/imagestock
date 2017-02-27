/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    angular.module('ImageGallery')
        .controller('ImageDetailController', ['$scope', 'imageService', 'detailImageService', function ($scope, imageService, detailImageService) {

            $scope.like = false;
            $scope.dislike = false;

            $scope.image = detailImageService.getImage();

            $scope.show = function () {
                console.log($scope.image);
            };

            $scope.setLike = function () {
                $scope.like = !$scope.like;
            };

            $scope.setDislike = function () {
                $scope.dislike = !$scope.dislike;
            }
        }]);
})();
