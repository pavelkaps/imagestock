const USER_ID = 'user';

class ImageDetailController {
    constructor($scope, detailImageService, $mdDialog, toaster, imageService) {
        this.init($scope, detailImageService, $mdDialog, toaster, imageService);
    }

    init($scope, detailImageService, $mdDialog, toaster, imageService) {
        
        $scope.like = false;
        $scope.dislike = false;

        $scope.image = detailImageService.getImage();

        SetLike($scope.image);
        
        function SetLike(image) {
            $scope.image.image_likes.forEach((el, ind, arr)=>{
               if(el.like_type === 'like' && el.own === USER_ID){
                   $scope.like = true;
               }else if(el.like_type === 'dislike' && el.own === USER_ID){
                   $scope.dislike = true;
               }
            });
        }

        $scope.setLike = () => {
            if($scope.like === false){
                imageService.addLike($scope.image.id, {
                    like_type: 'like'
                }).then((data)=>{
                    $scope.image.image_likes = data;
                    console.log(data);
                });
            }
            if ($scope.dislike === true && $scope.like === false) {
                $scope.dislike = false;

            }else if($scope.like === true){
                console.log($scope.image);
                imageService.deleteLike($scope.image.id).then((data)=>{
                    $scope.image.image_likes = data;
                });
            }
            $scope.like = !$scope.like;

        };

        $scope.setDislike = () => {
            if($scope.dislike === false){
                imageService.addLike($scope.image.id, {
                    like_type: 'dislike'
                }).then((data)=>{
                    $scope.image.image_likes = data;
                    console.log(data);
                });
            }
            if ($scope.dislike === false && $scope.like === true) {
                $scope.like = false;
                imageService.addLike($scope.image.id, {
                    like_type: 'dislike'
                }).then((data)=>{
                    $scope.image.image_likes = data;
                    console.log(data);
                });
            }else if($scope.dislike === true){
                console.log($scope.image);
                imageService.deleteLike($scope.image.id).then((data)=>{
                    $scope.image.image_likes = data;
                });
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

                imageService.addComment($scope.image.id, comment).then((image)=>{
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