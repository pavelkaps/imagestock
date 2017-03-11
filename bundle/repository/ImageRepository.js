'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Паша on 10.03.2017.
 */
var HTTP = new WeakMap();
var Q = new WeakMap();

var ImageRepository = exports.ImageRepository = function () {
    function ImageRepository($http, $q) {
        _classCallCheck(this, ImageRepository);

        this.db = new PouchDB('imagesnew');
        HTTP.set(this, $http);
        Q.set(this, $q);
    }

    _createClass(ImageRepository, [{
        key: 'getAll',
        value: function getAll() {
            var _this = this;

            return this.db.allDocs({
                include_docs: true,
                attachments: false
            }).then(function (data) {
                return Q.get(_this).all(data.rows.map(function (row) {
                    return _this.db.getAttachment(row.id, Object.keys(row.doc._attachments)[0]).then(function (data) {
                        return {
                            id: row.id,
                            comments: row.doc.comments,
                            image_likes: row.doc.image_likes,
                            imageUrl: URL.createObjectURL(data)
                        };
                    });
                })).catch(function (err) {
                    console.log(err);
                });
            });
        }
    }, {
        key: 'put',
        value: function put(image) {
            var _this2 = this;

            var defer = Q.get(this).defer();
            var docId = null;
            this.db.put(image).then(function (data) {
                return _this2.db.get(data.id);
            }).then(function (doc) {
                docId = doc;
                return _this2.db.getAttachment(doc._id, Object.keys(doc._attachments)[0]);
            }).then(function (data) {
                defer.resolve({
                    id: docId._id,
                    comments: docId.comments,
                    image_likes: docId.image_likes,
                    imageUrl: URL.createObjectURL(data)
                });
            }).catch(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    }, {
        key: 'addLike',
        value: function addLike(_id, like) {
            var _this3 = this;

            var defer = Q.get(this).defer();
            this.db.get(_id).then(function (doc) {
                _this3.deleteLikeFromDoc(doc, like.own);
                doc.image_likes.push(like);
                _this3.db.put(doc).then(function (data) {
                    defer.resolve(doc.image_likes);
                });
            }).catch(function (err) {
                defer.reject(err);
            });;
            return defer.promise;
        }
    }, {
        key: 'deleteLike',
        value: function deleteLike(_id, userId) {
            var _this4 = this;

            var defer = Q.get(this).defer();
            this.db.get(_id).then(function (doc) {
                _this4.deleteLikeFromDoc(doc, userId);
                defer.resolve(doc.image_likes);
            }).catch(function (err) {
                defer.reject(err);
            });;
            return defer.promise;
        }
    }, {
        key: 'deleteLikeFromDoc',
        value: function deleteLikeFromDoc(doc, userId) {
            doc.image_likes.find(function (el, ind, arr) {
                if (el.own === userId) {
                    doc.image_likes.splice(ind, 1);
                    return true;
                }
                return false;
            });
        }
    }, {
        key: 'addComment',
        value: function addComment(_id, comment) {
            var _this5 = this;

            var defer = Q.get(this).defer();
            this.db.get(_id).then(function (doc) {
                doc.comments.push(comment);
                _this5.db.put(doc).then(function (data) {
                    defer.resolve(data);
                });
            }).catch(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    }, {
        key: 'deleteComment',
        value: function deleteComment(idImage, idComment) {
            var _this6 = this;

            var defer = Q.get(this).defer();
            this.db.get(idImage).then(function (doc) {
                doc.comments.find(function (el, index, arr) {
                    if (el.id === idComment) {
                        doc.comments.splice(index, 1);
                        return true;
                    }
                    return false;
                });
                _this6.db.put(doc).then(function (data) {
                    defer.resolve(data);
                });
            }).catch(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    }, {
        key: 'getById',
        value: function getById(_id) {
            this.db.get(_id).then(function (doc) {
                console.log(doc);
            });
        }
    }, {
        key: 'deleteImageById',
        value: function deleteImageById(_id) {
            var _this7 = this;

            return this.db.get(_id).then(function (doc) {
                return _this7.db.remove(doc);
            });
        }
    }], [{
        key: 'getInstance',
        value: function getInstance($http, $q) {
            return new ImageRepository($http, $q);
        }
    }]);

    return ImageRepository;
}();

ImageRepository.getInstance.$inject = ['$http', '$q'];
//# sourceMappingURL=ImageRepository.js.map
