/**
 * Created by Паша on 01.03.2017.
 */
(function () {
    angular.module('ImageGallery').directive('theFreewall', function($window) {
            return function(scope, element, attrs) {
                scope.$on('LastBrick', function(event){
                    var wall = new Freewall(".galleryGrid");
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
        })
})();
