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

            function getWidthSize () {
                var digit = Math.random();

                if (digit < 0.5) {
                    return $scope.stylesCardWidth[0].width;
                } else {
                    return $scope.stylesCardWidth[1].width;
                }
            };

            function getHeightSize () {
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


            function randomResizeImages(data) {
                return data.map(function (data) {
                    return {width: getWidthSize(), height: getHeightSize(), image: data}
                });
            }

            function randomResizeOneImage(image) {
                return {width: getWidthSize(), height: getHeightSize(), image: image};
            }

            $scope.toDetail = function (ev, image) {
                detailImageService.setImage(image);
                $mdDialog.show({
                    templateUrl: './controllers/image-detail-controller/image-detail-controller.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false
                }).then(function (answer) {

                }, function () {
                    console.log('cancel dialog');
                });
            };

            $scope.addImage = function (ev) {
                $mdDialog.show({
                    templateUrl: './controllers/add-image/add-image-controller.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: false
                }).then(function (imageUrl) {
                    createImage(imageUrl);
                }, function () {
                    console.log('cancel dialog');
                });
            };

            function createImage(imageUrl){
                var image = {
                    image_url : imageUrl,
                    image_likes : [],
                    comments: []
                };

                $scope.resizingImages.push(randomResizeOneImage(image));
            }
            
            $scope.countActions = function (image, action) {
                var count = 0;
                image.image_likes.forEach(function (el, ind, arr) {
                    if(el.like_type === action){
                        count++;
                    }
                });
                return count;
            };
        }]);
})();
