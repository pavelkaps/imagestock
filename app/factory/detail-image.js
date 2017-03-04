/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    'use strict';
    angular.module('ImageGallery')
        .factory('detailImageService', function () {
            var sendService = {};
            var image = null;

            sendService.setImage = function (_image) {
                image = _image;
            };

            sendService.getImage = function(){
                return image;
            };

            return sendService;
        });
})();