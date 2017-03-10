class ImageService {
    constructor(repository) {
        this.repository = repository;
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

    getById(_id) {
        return this.repository.getById(_id);
    }

    deleteComment(idImage, idComment){
        return this.repository.deleteComment(idImage, idComment);
    }

    deleteImageById(_id) {
        return this.repository.deleteImageById(_id);
    }

    static getInstance(repository) {
        return new ImageService(repository);
    }
}

ImageService.getInstance.$inject = ['imageRepository'];
export {
    ImageService
}