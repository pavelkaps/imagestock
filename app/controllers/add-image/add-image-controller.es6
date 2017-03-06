import { GUID } from '../../additional/GUID'

class AddImageController {
    constructor($scope, $mdDialog, toaster, imageService) {
        this.init($scope, $mdDialog, toaster, imageService);
    }
    init($scope, $mdDialog, toaster, imageService) {
        $scope.close = () => {
            $mdDialog.cancel();
        };

        $scope.addImage = (imageUrl) => {
            if($scope.image){
                var image = {
                    _id : GUID(2),
                    _attachments: $scope.image,
                    image_likes : [],
                    comments: []
                };

                imageService.put(image).then((image)=>{
                    console.log(image);
                    $mdDialog.hide(image);
                    toaster.pop('info', "Успешно", "Изображение добавленно");
                });

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
    }
}
AddImageController.$inject = ['$scope', '$mdDialog', 'toaster', 'imageService'];
export {AddImageController}