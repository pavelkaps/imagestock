const HTTP = new WeakMap();
const Q = new WeakMap();

const USER_ID = "user";

class ImageService {
    constructor($http, $q) {
        this.db = new PouchDB('imagesnew');
        this.imageApiURL = "./mock-data/images.json";

        HTTP.set(this, $http);
        Q.set(this, $q);
    }

    getAll(){
        //return HTTP.get(this).get(this.imageApiURL);
        //let defer = Q.get(this).defer();
        return this.db.allDocs({
            include_docs: true,
            attachments: false
        }).then((data)=> {
            console.log(data);
            return Q.get(this).all((data.rows.map((row)=> {
                return this.db.getAttachment(row.id, Object.keys(row.doc._attachments)[0]).then(( data )=> {
                    console.log(data);
                    return {
                        comments: row.doc.comments,
                        images_likes: row.doc.image_likes,
                        imageUrl: URL.createObjectURL(data)
                    }
                });
            })))
        });
    }

    addUrlToImage(doc){
        for (let filename in doc._attachments) {
            this.db.getAttachment(doc._id, filename).then(
                (data)=> {
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

    addLike(_id, like){
        like.own = USER_ID;
        let defer = Q.get(this).defer();
        this.db.get(_id).then((doc) => {

            doc.image_likes.find((el, ind, arr)=>{
                if(el.own === USER_ID){
                    doc.image_likes.splice(ind, 1);
                    return true;
                }
                return false;
            });
            
            doc.image_likes.push(like);
            this.db.put(doc).then((data)=>{
                defer.resolve(doc.image_likes);
            });

        });
        return defer.promise;
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