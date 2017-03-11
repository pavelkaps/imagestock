/**
 * Created by Паша on 10.03.2017.
 */
export class ImageRepository {
    constructor() {
        this.db = new PouchDB('imagesnew');
    }

    getAll() {
        return this.db.allDocs({
            include_docs: true,
            attachments: false
        }).then((data)=> {
            return Promise.all((data.rows.map((row)=> {
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
        return this.db.put(image).then((data)=> {
            return this.db.get(data.id)
        }).then((doc) => {
            return this.db.getAttachment(doc._id, Object.keys(doc._attachments)[0])
                .then(attachment => {
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
        return this.db.get(_id).then((doc) => {
            let image = {...doc, image_likes: [...doc.image_likes.filter(_like => _like.own !== like.own), like]};
            return this.db.put(image).then(res => image);
        });
    }

    deleteLike(_id, userId) {
        return this.db.get(_id).then((doc) => {
            console.log(doc, "doc");
            let image = {...doc, image_likes: doc.image_likes.filter(like => like.own !== userId)};
            console.log(image, "image");
            return this.db.put(image).then(res => image);

        });
    }

    addComment(_id, comment) {
        return this.db.get(_id).then((doc) => {
            let image = {...doc, comments: [...doc.comments, comment]};
            return this.db.put(image);
        });
    }

    deleteComment(idImage, commentId) {
        return this.db.get(idImage).then((doc) => {
            let image = {...doc, comments: doc.comments.filter(comment => comment.id !== commentId)};
            return this.db.put(image);
        });
    }

    deleteImageById(_id) {
        return this.db.get(_id).then((doc) => {
            return this.db.remove(doc);
        })
    }
}
