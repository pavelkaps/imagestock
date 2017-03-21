'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Паша on 10.03.2017.
 */
var ImageRepository = exports.ImageRepository = function () {
    function ImageRepository() {
        _classCallCheck(this, ImageRepository);

        this.db = new PouchDB('imagesnew');
    }

    _createClass(ImageRepository, [{
        key: 'getAll',
        value: function getAll() {
            var _this = this;

            return Rx.Observable.fromPromise(this.db.allDocs({
                include_docs: true,
                attachments: false
            })).flatMap(function (data) {
                return Rx.Observable.forkJoin(data.rows.map(function (row) {
                    return Rx.Observable.fromPromise(_this.db.getAttachment(row.id, Object.keys(row.doc._attachments)[0])).map(function (data) {
                        return {
                            id: row.id,
                            comments: row.doc.comments,
                            image_likes: row.doc.image_likes,
                            imageUrl: URL.createObjectURL(data)
                        };
                    });
                }));
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: 'put',
        value: function put(image) {
            var _this2 = this;

            return Rx.Observable.fromPromise(this.db.put(image)).flatMap(function (data) {
                return Rx.Observable.fromPromise(_this2.db.get(data.id));
            }).flatMap(function (doc) {
                return Rx.Observable.fromPromise(_this2.db.getAttachment(doc._id, Object.keys(doc._attachments)[0])).map(function (attachment) {
                    return {
                        id: doc._id,
                        comments: doc.comments,
                        image_likes: doc.image_likes,
                        imageUrl: URL.createObjectURL(attachment)
                    };
                });
            });
        }
    }, {
        key: 'addLike',
        value: function addLike(_id, like) {
            var _this3 = this;

            return Rx.Observable.fromPromise(this.db.get(_id)).flatMap(function (doc) {
                var image = _extends({}, doc, { image_likes: [].concat(_toConsumableArray(doc.image_likes.filter(function (_like) {
                        return _like.own !== like.own;
                    })), [like]) });
                return Rx.Observable.fromPromise(_this3.db.put(image)).map(function (res) {
                    return image;
                });
            });
        }
    }, {
        key: 'deleteLike',
        value: function deleteLike(_id, userId) {
            var _this4 = this;

            return Rx.Observable.fromPromise(this.db.get(_id)).flatMap(function (doc) {
                var image = _extends({}, doc, { image_likes: doc.image_likes.filter(function (like) {
                        return like.own !== userId;
                    }) });
                return Rx.Observable.fromPromise(_this4.db.put(image)).map(function (res) {
                    return image;
                });
            });
        }
    }, {
        key: 'addComment',
        value: function addComment(_id, comment) {
            var _this5 = this;

            return Rx.Observable.fromPromise(this.db.get(_id)).flatMap(function (doc) {
                var image = _extends({}, doc, { comments: [].concat(_toConsumableArray(doc.comments), [comment]) });
                return Rx.Observable.fromPromise(_this5.db.put(image));
            });
        }
    }, {
        key: 'deleteComment',
        value: function deleteComment(idImage, commentId) {
            var _this6 = this;

            return Rx.Observable.fromPromise(this.db.get(idImage)).flatMap(function (doc) {
                var image = _extends({}, doc, { comments: doc.comments.filter(function (comment) {
                        return comment.id !== commentId;
                    }) });
                return Rx.Observable.fromPromise(_this6.db.put(image));
            });
        }
    }, {
        key: 'deleteImageById',
        value: function deleteImageById(_id) {
            var _this7 = this;

            return Rx.Observable.fromPromise(this.db.get(_id)).flatMap(function (doc) {
                return Rx.Observable.fromPromise(_this7.db.remove(doc));
            });
        }
    }]);

    return ImageRepository;
}();
//# sourceMappingURL=ImageRepository.js.map
