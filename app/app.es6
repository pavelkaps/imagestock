
import {AddImageController} from './controllers/add-image/add-image-controller';
import {GalleryController} from  './controllers/gallery-controller/gallery-controller'
import {ImageDetailController} from  './controllers/image-detail-controller/image-detail-controller'

import {Config} from './route/app.routing'

import {DetailImageService} from './factory/detail-image'
import {ImageService} from './factory/image-factory'

import {Reverse} from './filters/reverse'

import {RepeatBrick} from './directives/repeat-brick'
import {TheFreeWall} from './directives/the-freewall'

angular.module('ImageGallery', ['ngRoute','angularCSS', 'ngMaterial', 'toaster', 'naif.base64', '720kb.background'])
    .config(Config)
    .controller('AddImageController', AddImageController)
    .controller('GalleryController', GalleryController)
    .controller('ImageDetailController', ImageDetailController)
    .factory('detailImageService', DetailImageService.getInstance)
    .factory('imageService', ImageService.getInstance)
    .filter('reverse', Reverse)
    .directive('repeatBrick', RepeatBrick)
    .directive('theFreewall', TheFreeWall);

