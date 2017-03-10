'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageResizer = exports.ImageResizer = function () {
    function ImageResizer() {
        _classCallCheck(this, ImageResizer);

        this.stylesCardWidth = [{
            width: 'width-1-col'
        }, {
            width: 'width-2-col'
        }];

        this.stylesCardHeight = [{
            height: 'height-1-col'
        }, {
            height: 'height-2-col'
        }];
    }

    _createClass(ImageResizer, [{
        key: 'getWidthSize',
        value: function getWidthSize() {
            var digit = Math.random();

            if (digit < 0.5) {
                return this.stylesCardWidth[0].width;
            } else {
                return this.stylesCardWidth[1].width;
            }
        }
    }, {
        key: 'getHeightSize',
        value: function getHeightSize() {
            var digit = Math.random();
            if (digit < 0.5) {
                return this.stylesCardHeight[0].height;
            } else {
                return this.stylesCardHeight[1].height;
            }
        }
    }]);

    return ImageResizer;
}();
//# sourceMappingURL=ImageResizer.js.map
