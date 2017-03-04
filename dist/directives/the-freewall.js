"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TheFreeWall = function () {
    function TheFreeWall(scope, element, attrs) {
        _classCallCheck(this, TheFreeWall);

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

            wall.container.find('.card').on('load', function () {
                wall.fitHeight(590);
            });

            $window.dispatchEvent(new Event('resize'));
        });
    }

    _createClass(TheFreeWall, null, [{
        key: "getInstance",
        value: function getInstance() {
            return new TheFreeWall();
        }
    }]);

    return TheFreeWall;
}();

exports.TheFreeWall = TheFreeWall;
//# sourceMappingURL=the-freewall.js.map
