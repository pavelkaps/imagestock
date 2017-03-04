'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddImageController = function () {
    function AddImageController($scope, $mdDialog) {
        _classCallCheck(this, AddImageController);

        this.init($scope, $mdDialog);
    }

    _createClass(AddImageController, [{
        key: 'init',
        value: function init($scope, $mdDialog) {
            $scope.close = function () {
                $mdDialog.cancel();
            };

            $scope.addImage = function (imageUrl) {
                $mdDialog.hide(imageUrl);
            };

            $scope.$watch('imageUrl', function () {}, true);
        }
    }]);

    return AddImageController;
}();

AddImageController.$inject = ['$scope', '$mdDialog'];
exports.AddImageController = AddImageController;
//# sourceMappingURL=add-image-controller.js.map
