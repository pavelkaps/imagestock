import {ImageResizer} from '../../additional/ImageResizer'

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
        $scope.resizer = new ImageResizer();

        imageService.getAll().then(
            function (data) {
                $scope.$apply(()=> {
                    console.log(data);
                    $scope.resizingImages = randomResizeImages(data);
                    console.log($scope.resizingImages);
                });

            },
            (err) => {
                console.log(err);
            }
        );
        var originatorEv;
        $scope.openMenu = ($mdMenu, event) => {
            originatorEv = event;
            $mdMenu.open(event);
        };

        $scope.showConfirmForDelete = (ev, image) => {
            console.log('delete dialog');
            var confirm = $mdDialog.confirm()
                .title('Do you want to delete this image?')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(()=> {
                $scope.deleteImage(image);
            }, () => {

            });
        };

        $scope.deleteImage = (image) => {
            console.log(image);
            imageService.deleteImageById(image.id).then((data)=> {
                if (data.ok === true) {
                    $scope.resizingImages.find((el, index, arr)=> {
                        if (el.image.id === image.id) {
                            $scope.resizingImages.splice(index, 1);
                            return true;
                        }
                        return false;
                    });
                }
                toaster.pop('info', "Успешно", "Изображение удавленно");
                $scope.$apply();
            });
        };


        function randomResizeImages(data) {
            return data.map((data) => {
                return randomResizeOneImage(data);
            });
        }

        function randomResizeOneImage(image) {
            return {width: $scope.resizer.getWidthSize(), height: $scope.resizer.getHeightSize(), image: image};
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
                if (el.like_type === action) {
                    count++;
                }
            });
            return count;
        };
    }
}
GalleryController.$inject = ['$scope', 'imageService', 'detailImageService', '$mdDialog', 'toaster', '$window'];
export {GalleryController}