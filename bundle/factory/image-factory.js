'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ImageRepository = require('../repository/ImageRepository');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageService = function () {
    function ImageService() {
        _classCallCheck(this, ImageService);

        this.repository = new _ImageRepository.ImageRepository();
    }

    _createClass(ImageService, [{
        key: 'getAll',
        value: function getAll() {
            return this.repository.getAll();
        }
    }, {
        key: 'put',
        value: function put(image) {
            return this.repository.put(image);
        }
    }, {
        key: 'addLike',
        value: function addLike(_id, like) {
            return this.repository.addLike(_id, like);
        }
    }, {
        key: 'deleteLike',
        value: function deleteLike(_id, userId) {
            return this.repository.deleteLike(_id, userId);
        }
    }, {
        key: 'addComment',
        value: function addComment(_id, comment) {
            return this.repository.addComment(_id, comment);
        }
    }, {
        key: 'deleteComment',
        value: function deleteComment(idImage, idComment) {
            return this.repository.deleteComment(idImage, idComment);
        }
    }, {
        key: 'deleteImageById',
        value: function deleteImageById(_id) {
            return this.repository.deleteImageById(_id);
        }
    }], [{
        key: 'getInstance',
        value: function getInstance() {
            return new ImageService();
        }
    }]);

    return ImageService;
}();

exports.ImageService = ImageService;
//# sourceMappingURL=image-factory.js.map
