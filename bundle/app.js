'use strict';

var _addImageController = require('./controllers/add-image/add-image-controller');

var _galleryController = require('./controllers/gallery-controller/gallery-controller');

var _imageDetailController = require('./controllers/image-detail-controller/image-detail-controller');

var _config = require('./config');

var _detailImage = require('./factory/detail-image');

var _imageFactory = require('./factory/image-factory');

var _reverse = require('./filters/reverse');

var _repeatBrick = require('./directives/repeat-brick');

var _theFreewall = require('./directives/the-freewall');

var _ImageRepository = require('./repository/ImageRepository');

angular.module('ImageGallery', ['ngRoute', 'angularCSS', 'ngMaterial', 'toaster', 'naif.base64', 'angularMoment']).config(_config.Config).controller('AddImageController', _addImageController.AddImageController).controller('GalleryController', _galleryController.GalleryController).controller('ImageDetailController', _imageDetailController.ImageDetailController).factory('detailImageService', _detailImage.DetailImageService.getInstance).factory('imageService', _imageFactory.ImageService.getInstance).factory('imageRepository', _ImageRepository.ImageRepository.getInstance).filter('reverse', _reverse.Reverse).directive('repeatBrick', _repeatBrick.RepeatBrick).directive('theFreewall', _theFreewall.TheFreeWall);
//# sourceMappingURL=app.js.map
