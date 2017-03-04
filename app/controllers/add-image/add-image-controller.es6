
class AddImageController {
    constructor($scope, $mdDialog) {
        this.init($scope, $mdDialog);
    }
    init($scope, $mdDialog) {
        $scope.close = () => {
            $mdDialog.cancel();
        };

        $scope.addImage = (imageUrl) => {
            $mdDialog.hide(imageUrl);
        };

        $scope.$watch('imageUrl', () => {

        }, true);
    }
}
AddImageController.$inject = ['$scope', '$mdDialog'];
export {AddImageController}