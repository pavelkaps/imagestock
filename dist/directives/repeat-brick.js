"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function RepeatBrick() {
    return function (scope, element, attrs) {
        if (scope.$last) {
            console.log("emmit");
            scope.$emit('LastBrick');
        }
    };
}

exports.RepeatBrick = RepeatBrick;
//# sourceMappingURL=repeat-brick.js.map
