/**
 * Created by Паша on 10.03.2017.
 */
const HTTP = new WeakMap();
const Q = new WeakMap();

export class ImageRepository {
    constructor($http, $q) {
        this.db = new PouchDB('imagesnew');
        HTTP.set(this, $http);
        Q.set(this, $q);
    }

    getAll() {
        return this.db.allDocs({
            include_docs: true,
            attachments: false
        }).then((data)=> {
            return Q.get(this).all((data.rows.map((row)=> {
                return this.db.getAttachment(row.id, Object.keys(row.doc._attachments)[0]).then((data)=> {
                    return {
                        id: row.id,
                        comments: row.doc.comments,
                        image_likes: row.doc.image_likes,
                        imageUrl: URL.createObjectURL(data)
                    }
                });
            }))).catch((err)=> {
                console.log(err);
            });
        });
    }

    put(image) {
        let defer = Q.get(this).defer();
        let docId = null;
        this.db.put(image).then((data)=> {
            return this.db.get(data.id)
        }).then((doc) => {
            docId = doc;
            return this.db.getAttachment(doc._id, Object.keys(doc._attachments)[0]);
        }).then((data)=> {
            defer.resolve({
                id: docId._id,
                comments: docId.comments,
                image_likes: docId.image_likes,
                imageUrl: URL.createObjectURL(data)
            });
        }).catch((err)=> {
                defer.reject(err);
            });
        return defer.promise;
    }

    addLike(_id, like) {
        let defer = Q.get(this).defer();
        this.db.get(_id).then((doc) => {
            this.deleteLikeFromDoc(doc, like.own);
            doc.image_likes.push(like);
            this.db.put(doc).then((data)=> {
                defer.resolve(doc.image_likes);
            });

        }).catch((err)=> {
            defer.reject(err);
        });;
        return defer.promise;
    }

    deleteLike(_id, userId) {
        let defer = Q.get(this).defer();
        this.db.get(_id).then((doc) => {
            this.deleteLikeFromDoc(doc, userId);
            defer.resolve(doc.image_likes);
        }).catch((err)=> {
            defer.reject(err);
        });;
        return defer.promise;
    }

    deleteLikeFromDoc(doc, userId) {
        doc.image_likes.find((el, ind, arr)=> {
            if (el.own === userId) {
                doc.image_likes.splice(ind, 1);
                return true;
            }
            return false;
        });
    }

    addComment(_id, comment) {
        let defer = Q.get(this).defer();
        this.db.get(_id).then((doc) => {
            doc.comments.push(comment);
            this.db.put(doc).then((data)=> {
                defer.resolve(data)
            });
        }).catch((err)=> {
            defer.reject(err);
        });
        return defer.promise;
    }

    deleteComment(idImage, idComment) {
        let defer = Q.get(this).defer();
        this.db.get(idImage).then((doc) => {
            doc.comments.find((el, index, arr)=> {
                if (el.id === idComment) {
                    doc.comments.splice(index, 1);
                    return true;
                }
                return false;
            });
            this.db.put(doc).then((data)=> {
                defer.resolve(data)
            });
        }).catch((err)=> {
            defer.reject(err);
        });
        return defer.promise;
    }

    getById(_id) {
        this.db.get(_id).then((doc) => {
            console.log(doc);
        });
    }

    deleteImageById(_id) {
        return this.db.get(_id).then((doc) => {
            return this.db.remove(doc);
        })
    }

    static getInstance($http, $q) {
        return new ImageRepository($http, $q);
    }
}

ImageRepository.getInstance.$inject = ['$http', '$q'];