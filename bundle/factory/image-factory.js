"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTP = new WeakMap();
var Q = new WeakMap();

var USER_ID = "user";

var ImageService = function () {
    function ImageService($http, $q) {
        _classCallCheck(this, ImageService);

        this.db = new PouchDB('imagesnew');
        this.imageApiURL = "./mock-data/images.json";

        HTTP.set(this, $http);
        Q.set(this, $q);
    }

    _createClass(ImageService, [{
        key: "getAll",
        value: function getAll() {
            var _this = this;

            //return HTTP.get(this).get(this.imageApiURL);
            return this.db.allDocs({
                include_docs: true,
                attachments: false
            }).then(function (data) {
                console.log(data);
                return Q.get(_this).all(data.rows.map(function (row) {
                    return _this.db.getAttachment(row.id, Object.keys(row.doc._attachments)[0]).then(function (data) {
                        console.log(data);
                        return {
                            id: row.id,
                            comments: row.doc.comments,
                            image_likes: row.doc.image_likes,
                            imageUrl: URL.createObjectURL(data)
                        };
                    });
                }));
            });
        }
    }, {
        key: "put",
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
            });
            return defer.promise;
        }
    }, {
        key: "addLike",
        value: function addLike(_id, like) {
            var _this3 = this;

            var defer = Q.get(this).defer();
            this.db.get(_id).then(function (doc) {
                _this3.deleteLikeFromDoc(doc, like.own);
                doc.image_likes.push(like);
                _this3.db.put(doc).then(function (data) {
                    defer.resolve(doc.image_likes);
                });
            });
            return defer.promise;
        }
    }, {
        key: "deleteLike",
        value: function deleteLike(_id, userId) {
            var _this4 = this;

            var defer = Q.get(this).defer();
            this.db.get(_id).then(function (doc) {
                _this4.deleteLikeFromDoc(doc, userId);
                defer.resolve(doc.image_likes);
            });
            return defer.promise;
        }
    }, {
        key: "deleteLikeFromDoc",
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
        key: "addComment",
        value: function addComment(_id, comment) {
            var _this5 = this;

            var defer = Q.get(this).defer();
            this.db.get(_id).then(function (doc) {
                doc.comments.push(comment);
                _this5.db.put(doc).then(function (data) {
                    defer.resolve(data);
                });
            });
            return defer.promise;
        }
    }, {
        key: "getById",
        value: function getById(_id) {
            this.db.get(_id).then(function (doc) {
                console.log(doc);
            });
        }
    }, {
        key: "deleteImageById",
        value: function deleteImageById(_id) {
            var _this6 = this;

            return this.db.get(_id).then(function (doc) {
                return _this6.db.remove(doc);
            });
        }
    }, {
        key: "defaultImage",
        value: function defaultImage() {
            this.db.bulkDocs([{
                _id: 'mittens',
                occupation: 'kitten',
                cuteness: 9.0
            }, {
                _id: 'katie',
                occupation: 'kitten',
                cuteness: 7.0
            }, {
                _id: 'felix',
                occupation: 'kitten',
                cuteness: 8.0
            }]);
        }
    }], [{
        key: "getInstance",
        value: function getInstance($http, $q) {
            return new ImageService($http, $q);
        }
    }]);

    return ImageService;
}();

ImageService.getInstance.$inject = ['$http', '$q'];
exports.ImageService = ImageService;
//# sourceMappingURL=image-factory.js.map
