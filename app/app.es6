import {AddImageController} from './controllers/add-image/add-image-controller.es6';
import {GalleryController} from  './controllers/gallery-controller/gallery-controller.es6'
import {ImageDetailController} from  './controllers/image-detail-controller/image-detail-controller.es6'

import {Config} from './route/app.routing.es6'

import {DetailImageService} from './factory/detail-image.es6'
import {ImageService} from './factory/image-factory.es6'

import {Reverse} from './filters/reverse.es6'

import {RepeatBrick} from './directives/repeat-brick.es6'
import {TheFreeWall} from './directives/the-freewall.es6'


angular.module('ImageGallery', ['ngRoute','angularCSS', 'ngMaterial'])
    .config(Config)
    .controller('AddImageController', AddImageController)
    .controller('GalleryController', GalleryController)
    .controller('ImageDetailController', ImageDetailController)
    .factory('detailImageService', DetailImageService.getInstance())
    .factory('imageService', ImageService.getInstance())
    .filter('reverse', Reverse)
    .directive('repeatBrick', RepeatBrick.getInstance())
    .directive('', TheFreeWall.getInstance());

