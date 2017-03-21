import {GUID} from '../../additional/GUID'
import {RandomFillingImage} from '../../additional/RandomFillingImage'

class AddImageController {
    constructor($scope, $mdDialog, toaster, imageService) {
        this.init($scope, $mdDialog, toaster, imageService);
    }

    init($scope, $mdDialog, toaster, imageService) {
        $scope.close = () => {
            $mdDialog.cancel();
        };

        var randomFillingImage = new RandomFillingImage();

        this.randomLikes = false;
        this.randomComments = false;
        $scope.image = null;

        $scope.addImage = () => {
            if ($scope.image) {
                var image = {
                    _id: GUID(2),
                    _attachments: $scope.image,
                    image_likes: [],
                    comments: []
                };
                if(this.randomLikes === true){
                    randomFillingImage.setLikes(image);
                }
                if(this.randomComments === true){
                    randomFillingImage.setComment(image);
                }
                imageService.put(image)
                    .subscribe((image)=> {
                        $mdDialog.hide(image);
                        toaster.pop('info', "Успешно", "Изображение добавленно");
                    }, ErrorHandler);
            }
        };


        $scope.onLoad = function (e, reader, file, fileList, fileObjects, fileObj) {
            var attachment = {};
            attachment[fileObj.filename] = {
                content_type: fileObj.filetype,
                data: fileObj.base64
            };
            $scope.image = attachment;
        };

        $scope.getImageData = function () {
            if ($scope.image) {
                return $scope.image[Object.keys($scope.image)[0]];
            }
        };

        $scope.openMenu = ($mdMenu, event) => {
            var originatorEv = event;
            $mdMenu.open(event);
        };

        function ErrorHandler(err){
            console.log(err);
            toaster.pop('info', "Ошибка", "Произошла ошибка");
        }
    }
}
AddImageController.$inject = ['$scope', '$mdDialog', 'toaster', 'imageService'];
export {AddImageController}