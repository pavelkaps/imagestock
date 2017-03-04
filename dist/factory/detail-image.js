"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DetailImageService = function () {
    function DetailImageService() {
        _classCallCheck(this, DetailImageService);

        this.image = null;
        this.init();
    }

    _createClass(DetailImageService, [{
        key: "setImage",
        value: function setImage(_image) {
            this.image = _image;
        }
    }, {
        key: "getImage",
        value: function getImage() {
            return this.image;
        }
    }], [{
        key: "getInstance",
        value: function getInstance() {
            return new DetailImageService();
        }
    }]);

    return DetailImageService;
}();

exports.DetailImageService = DetailImageService;
//# sourceMappingURL=detail-image.js.map
