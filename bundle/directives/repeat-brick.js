'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function RepeatBrick() {
    return function (scope, element, attrs) {
        console.log('repeat directive');
        if (scope.$last) {
            console.log('last');
            scope.$emit('LastBrick');
        }
    };
}

exports.RepeatBrick = RepeatBrick;
//# sourceMappingURL=repeat-brick.js.map
