
class AddImageController {
    constructor($scope, $mdDialog, toaster) {
        this.init($scope, $mdDialog, toaster);
    }
    init($scope, $mdDialog, toaster) {
        $scope.close = () => {
            $mdDialog.cancel();
        };

        $scope.addImage = (imageUrl) => {
            if($scope.addImageForm.$valid){
                $mdDialog.hide(imageUrl);
                toaster.pop('info', "Успешно", "Изображение добавленно");
            }
        };

        $scope.$watch('imageUrl', () => {
        }, true);
    }
}
AddImageController.$inject = ['$scope', '$mdDialog', 'toaster'];
export {AddImageController}