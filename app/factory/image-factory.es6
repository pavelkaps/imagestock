import {ImageRepository} from '../repository/ImageRepository'

class ImageService {
    constructor() {
        this.repository = new ImageRepository();
    }
    getAll() {
        return this.repository.getAll();
    }

    put(image) {
        return this.repository.put(image);
    }

    addLike(_id,  like) {
        return this.repository.addLike(_id, like);
    }

    deleteLike(_id, userId) {
        return this.repository.deleteLike(_id, userId);
    }

    addComment(_id, comment) {
        return this.repository.addComment(_id, comment);
    }

    deleteComment(idImage, idComment){
        return this.repository.deleteComment(idImage, idComment);
    }

    deleteImageById(_id) {
        return this.repository.deleteImageById(_id);
    }

    static getInstance() {
        return new ImageService();
    }
}

export {
    ImageService
}