/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    'use strict';
    angular.module('ImageGallery')
        .controller('GalleryController',['$scope','imageService', function ($scope, imageService) {
            imageService.getAll().then(
                function (data) {
                    console.log(data);
                },

                function (err) {
                    console.log(err);
                }
            )
        }]);
})();
