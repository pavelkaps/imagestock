/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    'use strict';
    angular.module('ImageGallery')
        .controller('GalleryController',['$scope','imageService','detailImageService', function ($scope, imageService,detailImageService) {

            imageService.getAll().then(
                function (data) {
                    $scope.images = data.data;
                },

                function (err) {
                    console.log(err);
                }
            );
            
            $scope.toDetail = function (image) {
                detailImageService.sendToDetailImageController(image);
                console.log('image set');
            };
            
        }]);
})();
