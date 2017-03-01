/**
 * Created by Паша on 24.02.2017.
 */
(function () {
    angular.module('ImageGallery', ['ngRoute','angularCSS', 'ngMaterial']).directive('repeatBrick', function() {
        return function(scope, element, attrs) {
            if (scope.$last){
                console.log("emmit");
                scope.$emit('LastBrick');
            }
        }
    })
        .directive('theFreewall', function($window) {
            return function(scope, element, attrs) {
                scope.$on('LastBrick', function(event){
                    var wall = new Freewall("#freewall");
                    console.log("directive");
                    wall.reset({
                        selector: '.card',
                        draggable: true,
                        animate: true,
                        cellW: 238,
                        cellH: 190,
                        onResize: function() {
                            wall.fitHeight($window.innerHeight);
                        }
                        
                    });

                    wall.container.find('.card').on('load', (function() {
                        wall.fitHeight($window.innerHeight);
                    }));

                    $window.dispatchEvent(new Event('resize'));

                });
            };
        });
})();
