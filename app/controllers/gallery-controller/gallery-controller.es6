class GalleryController {
    constructor($scope, imageService, detailImageService, $mdDialog, toaster, $window) {
        this.init($scope, imageService, detailImageService, $mdDialog, toaster, $window);
    }
    init($scope, imageService, detailImageService, $mdDialog, toaster, $window) {
        toaster.pop({
            timeout: 20000,
            showCloseButton: true,
            limit: 5
        });

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
                console.log(data);
                $scope.resizingImages = randomResizeImages(data);
                console.log($scope.resizingImages);
            },
            (err) => {
                console.log(err);
            }
        );


        function randomResizeImages(data) {
            return data.map((data) => {
                return {width: getWidthSize(), height: getHeightSize(), image: data}
            });
        }

        function randomResizeOneImage(image) {
            return {width: getWidthSize(), height: getHeightSize(), image: image};
        }

        $scope.toDetail = (ev, image) => {
            console.log(ev);
            detailImageService.setImage(image);
            $mdDialog.show({
                templateUrl: './app/controllers/image-detail-controller/image-detail-controller.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: false
            }).then((answer) => {

            }, () => {
                console.log('cancel dialog');
            });
        };

        $scope.addImage = function (ev) {
            $mdDialog.show({
                templateUrl: './app/controllers/add-image/add-image-controller.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: false
            }).then((image) => {
                $scope.resizingImages.push(randomResizeOneImage(image))
                
            }, () => {
                console.log('cancel dialog');
            });
        };

        $scope.countActions = (image, action) => {
            var count = 0;
            image.image_likes.forEach((el, ind, arr) => {
                if(el.like_type === action){
                    count++;
                }
            });
            return count;
        };
    }
}
GalleryController.$inject = ['$scope', 'imageService', 'detailImageService', '$mdDialog', 'toaster', '$window'];
export {GalleryController}