
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
                    _id : guid(),
                    _attachments: $scope.image,
                    image_likes : [],
                    comments: []
                };

                imageService.put(image).then((image)=>{
                    console.log(image);
                    $mdDialog.hide(image);
                });

                toaster.pop('info', "Успешно", "Изображение добавленно");
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

        function guid() {
            return s4() + s4() + '-' + s4() + s4();
        }

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
    }
}
AddImageController.$inject = ['$scope', '$mdDialog', 'toaster', 'imageService'];
export {AddImageController}