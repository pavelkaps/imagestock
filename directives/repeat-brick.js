/**
 * Created by Паша on 01.03.2017.
 */
(function () {
    angular.module('ImageGallery').directive('repeatBrick', function() {
        return function(scope, element, attrs) {
            if (scope.$last){
                console.log("emmit");
                scope.$emit('LastBrick');
            }
        }
    })
})();
