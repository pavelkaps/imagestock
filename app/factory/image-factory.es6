const HTTP = new WeakMap();

class ImageService {
    constructor($http) {
        this.imageApiURL = "./mock-data/images.json";
        HTTP.set(this, $http);
    }

    getAll(){
        return HTTP.get(this).get(this.imageApiURL);
    }

    static getInstance($http){
        return new ImageService($http);
    }
}

ImageService.getInstance.$inject = ['$http'];
export {ImageService}