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
                        animate: true,
                        cellW: 238,
                        cellH: 190,
                        gutterX: 10,
                        gutterY: 10,
                        onResize: function() {
                            wall.fitHeight(590);
                        }
                        
                    });

                    wall.container.find('.card').on('load', (function() {
                        wall.fitHeight(590);
                    }));

                    $window.dispatchEvent(new Event('resize'));

                });
            };
        });
})();
