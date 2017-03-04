class DetailImageService {

    constructor() {
        this.image = null;
        this.init();
    }

    setImage(_image){
        this.image = _image;
    };

    getImage(){
        return this.image;
    };

    static getInstance(){
        return new DetailImageService();
    }

}

export {DetailImageService}