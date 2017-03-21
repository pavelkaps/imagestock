import {ImageResizer} from '../../additional/ImageResizer'

class GalleryController {
    constructor($scope, imageService, detailImageService, $mdDialog, toaster, $window) {
        this.init($scope, imageService, detailImageService, $mdDialog, toaster, $window);
    }

    init($scope, imageService, detailImageService, $mdDialog, toaster, $window) {

        $scope.resizingImages = [];
        $scope.resizer = new ImageResizer();

        imageService.getAll().subscribe(
            function (data) {
                console.log(data);
                $scope.resizingImages = randomResizeImages(data);
                $scope.$apply();
            }
        );

        $scope.openMenu = ($mdMenu, event) => {
            var originatorEv = event;
            $mdMenu.open(event);
        };

        $scope.showConfirmForDelete = (ev, image) => {
            var confirm = $mdDialog.confirm()
                .title('Do you want to delete this image?')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(()=> {
                deleteImage(image);
            });
        };

        function deleteImage(image) {
            console.log(image);
            imageService.deleteImageById(image.id)
                .subscribe((data)=> {
                if (data.ok === true) {
                    DeleteFromResizingImages(image.id);
                    toaster.pop('info', "Успешно", "Изображение удалено");
                    $scope.$apply();
                }
            }, ErrorHandler);
        };

        $scope.toDetail = (ev, image) => {
            detailImageService.setImage(image);
            $mdDialog.show({
                templateUrl: './app/controllers/image-detail-controller/image-detail-controller.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: false
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
                $scope.resizingImages.push(randomResizeOneImage(image));
            });
        };

        $scope.countActions = (image, action) => {
            return image.image_likes
                .filter(like => like.like_type === action)
                .length;
        };

        function DeleteFromResizingImages(_id) {
            $scope.resizingImages = $scope.resizingImages
            .filter(data =>  data.image.id !== _id);
        }

        function randomResizeImages(data) {
            return data.map((data) => {
                return randomResizeOneImage(data);
            });
        }

        function randomResizeOneImage(image) {
            return {width: $scope.resizer.getWidthSize(), height: $scope.resizer.getHeightSize(), image: image};
        }


        function ErrorHandler(err) {
            console.log(err);
            toaster.pop('info', "Ошибка", "Произошла ошибка");
        }
    }
}
GalleryController.$inject = ['$scope', 'imageService', 'detailImageService', '$mdDialog', 'toaster', '$window'];
export {GalleryController}