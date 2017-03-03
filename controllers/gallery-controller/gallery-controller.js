/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    'use strict';
    angular.module('ImageGallery')
        .controller('GalleryController', ['$scope', 'imageService', 'detailImageService', '$mdDialog', function ($scope, imageService, detailImageService, $mdDialog) {
            $scope.resizingImages = [];

            $scope.stylesCardWidth = [
                {
                    width: 'width-1-col'
                },
                {
                    width: 'width-2-col'
                }];

            $scope.stylesCardHeight = [
                {
                    height: 'height-1-col'
                },
                {
                    height: 'height-2-col'
                }];

            $scope.getWidthSize = function () {
                var digit = Math.random();

                if (digit < 0.5) {
                    return $scope.stylesCardWidth[0].width;
                } else {
                    return $scope.stylesCardWidth[1].width;
                }
            };

            $scope.getHeightSize = function () {
                var digit = Math.random();
                if (digit < 0.5) {
                    return $scope.stylesCardHeight[0].height;
                } else {
                    return $scope.stylesCardHeight[1].height;
                }
            };


            imageService.getAll().then(
                function (data) {
                    $scope.resizingImages = randomResizeImages(data.data);
                },
                function (err) {
                    console.log(err);
                }
            );


            function randomResizeImages(data){
                return data.map(function (data) {
                   return {width: $scope.getWidthSize(), height: $scope.getHeightSize(), image: data}
                });
            }
            
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

            $scope.addImage = function () {
              var image = [{
                  image_url: 'https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider1.jpg'
              }];

                var resizeImage = randomResizeImages(image);
                $scope.resizingImages.push(resizeImage[0]);
            };
        }]);
})();
