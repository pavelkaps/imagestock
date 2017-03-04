/**
 * Created by Паша on 03.03.2017.
 */
(function () {
    angular.module('ImageGallery')
        .controller('AddImageController', ['$scope', 'imageService', 'detailImageService', '$mdDialog', function ($scope, imageService, detailImageService, $mdDialog) {
            
            $scope.close = function() {
                $mdDialog.cancel();
            };

            $scope.addImage = function (imageUrl) {
                
                $mdDialog.hide(imageUrl);
            };

            $scope.$watch('imageUrl', function() {
                
            }, true);
        }]);
})();
