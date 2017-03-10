"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function TheFreeWall($window) {
    return function (scope, element, attrs) {
        scope.$on('LastBrick', function (event) {
            var wall = new Freewall(".galleryGrid");
            console.log("directive");
            wall.reset({
                selector: '.card',
                animate: true,
                cellW: 238,
                cellH: 190,
                gutterX: 10,
                gutterY: 10,
                onResize: function onResize() {
                    wall.fitHeight(590);
                }
            });

            scope.wall = wall;
            wall.container.find('.card').on('load', function () {
                wall.fitHeight(590);
            });
            $window.dispatchEvent(new Event('resize'));
        });
    };
}

TheFreeWall.$inject = ['$window'];
exports.TheFreeWall = TheFreeWall;
//# sourceMappingURL=the-freewall.js.map
