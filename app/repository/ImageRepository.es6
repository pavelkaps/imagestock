/**
 * Created by Паша on 10.03.2017.
 */
export class ImageRepository {
    constructor() {
        this.db = new PouchDB('imagesnew');
    }

    getAll() {
        return Rx.Observable.fromPromise(this.db.allDocs({
            include_docs: true,
            attachments: false
        }))
        .flatMap(((data)=> {
            return Rx.Observable.forkJoin((
                data.rows.map((row)=> {
                return Rx.Observable.fromPromise(this.db.getAttachment(row.id, Object.keys(row.doc._attachments)[0]))
                .map((data)=> {
                    return {
                        id: row.id,
                        comments: row.doc.comments,
                        image_likes: row.doc.image_likes,
                        imageUrl: URL.createObjectURL(data)
                    }
                });
            })));
        }))
        .catch((err)=> {
            console.log(err);
        })
    }

    put(image) {
        return Rx.Observable.fromPromise(this.db.put(image))
        .flatMap((data)=> {
            return Rx.Observable.fromPromise(this.db.get(data.id))
        })
        .flatMap((doc) => {
            return Rx.Observable.fromPromise(this.db.getAttachment(doc._id, Object.keys(doc._attachments)[0]))
                .map(attachment => {
                    return {
                        id: doc._id,
                        comments: doc.comments,
                        image_likes: doc.image_likes,
                        imageUrl: URL.createObjectURL(attachment)
                    };
                });
        });
    }

    addLike(_id, like) {
        return Rx.Observable.fromPromise(this.db.get(_id))
        .flatMap((doc) => {
            let image = {...doc, image_likes: [...doc.image_likes.filter(_like => _like.own !== like.own), like]};
            return Rx.Observable.fromPromise(this.db.put(image))
                                .map(res => image);
        });
    }

    deleteLike(_id, userId) {
        return Rx.Observable.fromPromise(this.db.get(_id))
        .flatMap((doc) => {
            let image = {...doc, image_likes: doc.image_likes.filter(like => like.own !== userId)};
            return Rx.Observable.fromPromise(this.db.put(image))
                                .map(res => image);
        });
    }

    addComment(_id, comment) {
        return Rx.Observable.fromPromise(this.db.get(_id))
        .flatMap((doc) => {
            let image = {...doc, comments: [...doc.comments, comment]};
            return Rx.Observable.fromPromise(this.db.put(image));
        });
    }

    deleteComment(idImage, commentId) {
        return Rx.Observable.fromPromise(this.db.get(idImage))
        .flatMap((doc) => {
            let image = {...doc, comments: doc.comments.filter(comment => comment.id !== commentId)};
            return Rx.Observable.fromPromise(this.db.put(image));
        });
    }

    deleteImageById(_id) {
        return Rx.Observable.fromPromise(this.db.get(_id))
        .flatMap((doc) => {
            return Rx.Observable.fromPromise(this.db.remove(doc));
        })
    }
}
