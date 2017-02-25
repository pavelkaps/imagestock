/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    'use strict';
    angular.module('ImageGallery')
        .controller('GalleryController', ['$scope', 'imageService', 'detailImageService', '$mdDialog', function ($scope, imageService, detailImageService, $mdDialog) {

            imageService.getAll().then(
                function (data) {
                    $scope.images = data.data;
                },

                function (err) {
                    console.log(err);
                }
            );

            $scope.c = function (image) {
                detailImageService.sendToDetailImageController(image);
                console.log('image set');
            };

            $scope.toDetail = function (ev, image) {
                detailImageService.setImage(image);

                $mdDialog.show({
                    templateUrl: './controllers/image-detail-controller/image-detail-controller.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false
                })
                    .then(function (answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };

        }]);
})();
