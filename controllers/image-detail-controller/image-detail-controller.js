/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    angular.module('ImageGallery')
        .controller('ImageDetailController',['$scope', 'imageService','detailImageService',  function ($scope, imageService, detailImageService) {
            
            $scope.aboutImage=function (image) {
                $scope.image = image;
            };
            
            $scope.show = function () {
                console.log($scope.image);
            };

            detailImageService.setController({
                name: 'ImageDetailController',
                scope: $scope
            });

        }]);
})();
