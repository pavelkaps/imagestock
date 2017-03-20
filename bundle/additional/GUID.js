'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GUID = GUID;
/**
 * @return {string}
 */
function GUID(count) {
    var guidKey = '';
    for (var i = 0; i < count; i++) {
        guidKey += s4() + s4();
    }
    return guidKey;
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
//# sourceMappingURL=GUID.js.map
