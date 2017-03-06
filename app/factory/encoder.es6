class Encoder {

    constructor($window) {

    }


    encode(_image){
        this.image = _image;
    };

    decode(){
        return this.image;
    };

    static getInstance(){
        return new Encoder();
    }

}

export {Encoder}