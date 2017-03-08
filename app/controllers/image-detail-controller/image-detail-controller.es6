const USER_ID = 'user';

class ImageDetailController {
    constructor($scope, detailImageService, $mdDialog, toaster, imageService) {
        this.init($scope, detailImageService, $mdDialog, toaster, imageService);
    }

    init($scope, detailImageService, $mdDialog, toaster, imageService) {
        
        $scope.like = false;
        $scope.dislike = false;

        $scope.image = detailImageService.getImage();
        SetLikeToImage($scope.image);

        $scope.setLike = () => {
            if($scope.like === false){
                AddLike('like');
            }
            if ($scope.dislike === true && $scope.like === false) {
                $scope.dislike = false;
            }else if($scope.like === true){
                DeleteLike($scope.image.id, USER_ID);
            }
            $scope.like = !$scope.like;

        };

        $scope.setDislike = () => {
            if($scope.dislike === false){
                AddLike('dislike');
            }
            if ($scope.dislike === false && $scope.like === true) {
                $scope.like = false;
            }else if($scope.dislike === true){
                DeleteLike($scope.image.id, USER_ID);
            }
            $scope.dislike = !$scope.dislike;
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
                }).catch(ErrorHandler);
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

        $scope.close = () => {
            $mdDialog.cancel();
        };

        function AddLike(type) {
            imageService.addLike($scope.image.id, {
                like_type: type
            }).then((data)=>{
                $scope.image.image_likes = data;
                console.log(data);
            });
        }

        function DeleteLike(imageId, userId) {
            imageService.deleteLike(imageId, userId).then((data)=>{
                $scope.image.image_likes = data;
            }).catch(ErrorHandler);
        }

        function SetLikeToImage(image) {
            image.image_likes.forEach((el, ind, arr)=>{
                if(el.like_type === 'like' && el.own === USER_ID){
                    $scope.like = true;
                }else if(el.like_type === 'dislike' && el.own === USER_ID){
                    $scope.dislike = true;
                }
            });
        }

        function ErrorHandler(err){
            console.log(err);
            toaster.pop('info', "Ошибка", "Произошла ошибка");
        }
    }
}

ImageDetailController.$inject = ['$scope', 'detailImageService', '$mdDialog', 'toaster','imageService'];
export {ImageDetailController}