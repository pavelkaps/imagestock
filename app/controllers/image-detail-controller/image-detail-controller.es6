class ImageDetailController {
    constructor($scope,  detailImageService, $mdDialog, toaster) {
        this.init($scope,  detailImageService, $mdDialog,toaster);
    }
    init($scope, detailImageService, $mdDialog, toaster) {
        $scope.showValid = false;
        $scope.like = false;
        $scope.dislike = false;

        $scope.image = detailImageService.getImage();

        $scope.setLike = () => {
            $scope.like = !$scope.like;
        };

        $scope.setDislike = () => {
            $scope.dislike = !$scope.dislike;
        };

        $scope.close = () => {
            $mdDialog.cancel();
        };

        $scope.addComment = (nickname, text) => {
            if($scope.commentForm.$valid){
                var comment = {};
                comment.own = nickname;
                comment.text = text;
                comment.data = Date.now();

                $scope.nickname = '';
                $scope.commentText = '';
                $scope.image.comments.push(comment);
                $scope.showValid = false;
            }else {
                $scope.showValid = true;
                toaster.pop('warning', "Ошибка", "Заполните все поля.");

            }
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
ImageDetailController.$inject = ['$scope','detailImageService', '$mdDialog', 'toaster'];
export {ImageDetailController}