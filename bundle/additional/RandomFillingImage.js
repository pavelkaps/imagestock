'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RandomFillingImage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GUID = require('./GUID');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RandomFillingImage = exports.RandomFillingImage = function () {
    function RandomFillingImage() {
        _classCallCheck(this, RandomFillingImage);

        this.nicknames = ['Anton', 'Sergey', 'Misha', 'Pasha', 'Sasha', 'Andrey', 'Dasha', 'Masha'];

        this.comments = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id quam eget lorem euismod faucibus eget sed lacus. Proin a sodales sem, eget porta dolor.', 'Proin bibendum turpis ut ante mattis, vitae pulvinar justo porta.', 'Nunc viverra maximus arcu eu mattis.', 'Ut tellus mi, commodo ut purus nec, facilisis venenatis dui.'];
    }

    _createClass(RandomFillingImage, [{
        key: 'setComment',
        value: function setComment(image) {
            var count = Math.floor(Math.random() * 12 - 2) + 2;
            var comments = [];
            console.log(count);
            for (var i = 1; i < count; i++) {
                var comment = {
                    own: this.nicknames[Math.floor(Math.random() * this.nicknames.length)],
                    text: this.comments[Math.floor(Math.random() * this.comments.length)],
                    date: this.randomDate(new Date(2012, 0, 1), new Date())
                };
                comments.push(comment);
            }
            image.comments = comments;
            return image;
        }
    }, {
        key: 'setLikes',
        value: function setLikes(image) {
            var count = Math.floor(Math.random() * 12 - 2) + 2;
            console.log(count);
            var likes = [];
            for (var i = 1; i < count; i++) {
                var like = {
                    own: (0, _GUID.GUID)(2)
                };
                var o = Math.floor(Math.random() * 10);
                if (o <= 5) {
                    like.like_type = 'like';
                } else if (o > 5) {
                    like.like_type = 'dislike';
                }
                likes.push(like);
            }
            image.image_likes = likes;
            return image;
        }
    }, {
        key: 'randomDate',
        value: function randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }
    }]);

    return RandomFillingImage;
}();
//# sourceMappingURL=RandomFillingImage.js.map
