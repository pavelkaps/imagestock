/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    'use strict';
    angular.module('ImageGallery')
        .factory('detailImageService', function () {
            var detailController;

            var sendService = {};
            var image = null;

            sendService.setController = function (controller) {
                detailController = {name: controller.name, scope: controller.scope};
            };

            sendService.sendToDetailImageController = function (image) {
                detailController.scope.aboutImage(image);
            };

            sendService.setImage = function (_image) {
                image = _image;
            };

            sendService.getImage = function(){
                return image;
            };

            return sendService;
        });
})();