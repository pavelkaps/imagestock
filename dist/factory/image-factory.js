"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTP = new WeakMap();

var ImageService = function () {
    function ImageService($http) {
        _classCallCheck(this, ImageService);

        this.imageApiURL = "./mock-data/images.json";
        HTTP.set(this, $http);
    }

    _createClass(ImageService, [{
        key: "getAll",
        value: function getAll() {
            return HTTP.get(this).get(this.imageApiURL);
        }
    }], [{
        key: "getInstance",
        value: function getInstance($http) {
            return new ImageService($http);
        }
    }]);

    return ImageService;
}();

ImageService.getInstance.$inject = ['$http'];
exports.ImageService = ImageService;
//# sourceMappingURL=image-factory.js.map
