/**
 * Created by Паша on 01.03.2017.
 */
(function () {
    angular.module('ImageGallery').filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        };
    });
})();
