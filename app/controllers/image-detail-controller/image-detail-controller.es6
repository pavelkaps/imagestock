class ImageDetailController {
    constructor($scope, detailImageService, $mdDialog, toaster, imageService) {
        this.init($scope, detailImageService, $mdDialog, toaster, imageService);
    }

    init($scope, detailImageService, $mdDialog, toaster, imageService) {
        
        $scope.like = false;
        $scope.dislike = false;

        $scope.image = detailImageService.getImage();

        $scope.setLike = () => {
            if ($scope.dislike === true && $scope.like === false) {
                $scope.dislike = false;
            }
            $scope.like = !$scope.like;
        };

        $scope.setDislike = () => {
            if ($scope.dislike === false && $scope.like === true) {
                $scope.like = false;
            }
            $scope.dislike = !$scope.dislike;
        };

        $scope.close = () => {
            $mdDialog.cancel();
        };

        $scope.addComment = (nickname, text) => {

            if ($scope.commentForm.$valid) {
                $scope.nickname = '';
                $scope.commentText = '';

                var comment = {
                    own: nickname,
                    text:  text,
                    date:  Date.now()
                };

                imageService.addComment($scope.image._id, comment).then((image)=>{
                    $scope.image.comments.push(comment);
                });
            } else {
                toaster.pop('warning', "Ошибка", "Заполните все поля.");

            }
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

ImageDetailController.$inject = ['$scope', 'detailImageService', '$mdDialog', 'toaster','imageService'];
export {ImageDetailController}