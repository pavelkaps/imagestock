const HTTP = new WeakMap();
const Q = new WeakMap();

class ImageService {
    constructor($http, $q) {
        this.db = new PouchDB('imagesnew');

        this.imageApiURL = "./mock-data/images.json";
        HTTP.set(this, $http);
        Q.set(this, $q);
    }

    getAll(){
        //return HTTP.get(this).get(this.imageApiURL);

        let defer = Q.get(this).defer();

        this.db.allDocs({
            include_docs: true,
            attachments: true
        }).then((data)=> {
            let images = [];
            for (let row of data.rows) {
                images.push(row.doc);
                for (let filename in row.doc._attachments) {
                        console.log(filename);
                    this.db.getAttachment(row.id, filename).then(
                        (data)=>{
                            var url = URL.createObjectURL(data);
                            images[images.indexOf(row.doc)].imageUrl = url;
                        }
                    );
                }
                defer.resolve(images);
            }
        });

        return defer.promise;
    }

    addUrlToImage(doc){
        for (let filename in doc._attachments) {
            console.log(filename);
            this.db.getAttachment(doc._id, filename).then(
                (data)=>{
                    var url = URL.createObjectURL(data);
                    doc.imageUrl = url;
                }
            );
        }
        return doc;
    };

    put(image){
        let defer = Q.get(this).defer();
        this.db.put(image).then((data)=>{
            this.db.get(data.id).then((doc) => {
                defer.resolve(this.addUrlToImage(doc));
            });
        });
        return defer.promise;
    }

    addLike(){
        
    }

    addComment(_id, comment){
        let defer = Q.get(this).defer();
        this.db.get(_id).then((doc) => {
            doc.comments.push(comment);
            this.db.put(doc).then((data)=>{
               defer.resolve(data)
            });
        });
        return defer.promise;
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


    static getInstance($http, $q){
        return new ImageService($http, $q);
    }
}

ImageService.getInstance.$inject = ['$http', '$q'];
export {ImageService}