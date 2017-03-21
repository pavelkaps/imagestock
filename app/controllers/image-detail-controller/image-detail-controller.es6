import {GUID} from '../../additional/GUID'

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
            if ($scope.like === false) {
                AddLike('like');
            }
            if ($scope.dislike === true && $scope.like === false) {
                $scope.dislike = false;
            } else if ($scope.like === true) {
                DeleteLike($scope.image.id, USER_ID);
            }
            $scope.like = !$scope.like;
        };

        $scope.setDislike = () => {
            if ($scope.dislike === false) {
                AddLike('dislike');
            }
            if ($scope.dislike === false && $scope.like === true) {
                $scope.like = false;
            } else if ($scope.dislike === true) {
                DeleteLike($scope.image.id, USER_ID);
            }
            $scope.dislike = !$scope.dislike;
        };

        $scope.addComment = (nickname, text) => {
            if ($scope.commentForm.$valid) {
                $scope.nickname = '';
                $scope.commentText = '';

                var comment = {
                    id: GUID(2),
                    own: nickname,
                    text: text,
                    date: Date.now()
                };

                imageService.addComment($scope.image.id, comment)
                .subscribe((image)=> {
                        console.log('add comment: ', image );
                        $scope.image.comments.push(comment);
                        $scope.$apply();
                    },
                    ErrorHandler);
            } else {
                toaster.pop('warning', "Ошибка", "Заполните все поля.");
            }
        };

        $scope.deleteComment = (image, comment) => {
            imageService.deleteComment(image.id, comment.id)
            .subscribe((data)=> {
                console.log('delete - ', data);
                if (data.ok === true) {
                    $scope.image.comments = image.comments.filter( _comment => _comment.id !== comment.id);
                    toaster.pop('info', "Успешно", "Коментарий удален.");
                    $scope.$apply();
                }
            },
            ErrorHandler
            );
        };

        $scope.countActions = (image, action) => {
            return image.image_likes
                .filter(like => like.like_type === action)
                .length;
        };

        $scope.close = () => {
            $mdDialog.cancel();
        };

        function AddLike(type) {
            imageService.addLike($scope.image.id, {
                like_type: type,
                own: USER_ID
            }).subscribe((data)=> {
                console.log('add like: ', data);
                $scope.image.image_likes = data.image_likes;
                $scope.$apply();
            },ErrorHandler);
        }

        function DeleteLike(imageId, userId) {
            imageService.deleteLike(imageId, userId)
            .subscribe((data)=> {
                console.log('delete like: ', data)
                $scope.image.image_likes = data.image_likes;
                $scope.$apply();
            },ErrorHandler);
        }

        function SetLikeToImage(image) {
            $scope.like = !!image.image_likes
                                    .filter((like)=> like.like_type === 'like' && like.own === USER_ID)
                                    .length;
            $scope.dislike = !!image.image_likes
                                    .filter((like)=> like.like_type === 'dislike' && like.own === USER_ID)
                                    .length;                  
        }

        function ErrorHandler(err) {
            console.log(err);
            toaster.pop('info', "Ошибка", "Произошла ошибка");
        }
    }
}

ImageDetailController.$inject = ['$scope', 'detailImageService', '$mdDialog', 'toaster', 'imageService'];
export {ImageDetailController}