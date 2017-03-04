/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    'use strict';
    angular.module('ImageGallery')
        .factory('imageService', ['$http', function($http) {
            var imageApiURL = "./mock-data/images.json";
            
            var imageService = {};

            imageService.getAll = function () {
                return $http.get(imageApiURL);
            };

            return imageService;
        }]);
})();