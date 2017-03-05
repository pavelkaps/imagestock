const HTTP = new WeakMap();

class ImageService {
    constructor($http) {
        this.db = new PouchDB('images');

        this.imageApiURL = "./mock-data/images.json";
        HTTP.set(this, $http);
    }

    getAll(){
        return HTTP.get(this).get(this.imageApiURL);

        /*this.db.allDocs({
            include_docs: true,
            attachments: true
        })*/
    }

    put(image){
        this.db.put(image);
    }

    addLike(){

    }

    addComment(){
        
    }

    getById(_id){
        this.db.get(_id).then(function (doc) {
            console.log(doc);
        });
    }

    deleteById(_id){
        this.db.get(_id).then(function (doc) {
            return this.db.remove(doc);
        });
    }

    defaultImage(){
        this.db.bulkDocs([
            {
                _id: 'mittens',
                occupation: 'kitten',
                cuteness: 9.0
            },
            {
                _id: 'katie',
                occupation: 'kitten',
                cuteness: 7.0
            },
            {
                _id: 'felix',
                occupation: 'kitten',
                cuteness: 8.0
            }
        ]);
    }


    static getInstance($http){
        return new ImageService($http);
    }
}

ImageService.getInstance.$inject = ['$http'];
export {ImageService}