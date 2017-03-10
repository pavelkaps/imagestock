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
            }
        ).catch(ErrorHandler);

        $scope.openMenu = ($mdMenu, event) => {
            var originatorEv = event;
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
                    DeleteFromResizingImages(image.id);
                    toaster.pop('info', "Успешно", "Изображение удалено");
                }


            }).catch(ErrorHandler);
        };

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

        function DeleteFromResizingImages(_id) {
            $scope.$apply(()=>{
                $scope.resizingImages = $scope.resizingImages.filter((data)=>{
                    return data.image.id !== _id;
                });
            });

            console.log($scope.resizingImages);
           /* $scope.resizingImages.find((el, index, arr)=> {
                if (el.image.id === _id) {
                    $scope.resizingImages.splice(index, 1);
                    return true;
                }
                return false;
            });*/
        }

        function randomResizeImages(data) {
            return data.map((data) => {
                return randomResizeOneImage(data);
            });
        }

        function randomResizeOneImage(image) {
            return {width: $scope.resizer.getWidthSize(), height: $scope.resizer.getHeightSize(), image: image};
        }


        function ErrorHandler(err){
            console.log(err);
            toaster.pop('info', "Ошибка", "Произошла ошибка");
        }
    }
}
GalleryController.$inject = ['$scope', 'imageService', 'detailImageService', '$mdDialog', 'toaster', '$window'];
export {GalleryController}