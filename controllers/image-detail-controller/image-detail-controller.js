/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    angular.module('ImageGallery')
        .controller('ImageDetailController', ['$scope', 'imageService', 'detailImageService', function ($scope, imageService, detailImageService) {

            $scope.image = detailImageService.getImage();

            $scope.show = function () {
                console.log($scope.image);
            };


        }]);
})();
