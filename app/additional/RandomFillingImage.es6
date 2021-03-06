import {GUID} from './GUID'

export class RandomFillingImage {
    constructor() {
        this.nicknames = ['Anton', 'Sergey', 'Misha', 'Pasha', 'Sasha', 'Andrey', 'Dasha', 'Masha'];

        this.comments = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id quam eget lorem euismod faucibus eget sed lacus. Proin a sodales sem, eget porta dolor.',
            'Proin bibendum turpis ut ante mattis, vitae pulvinar justo porta.', 'Nunc viverra maximus arcu eu mattis.', 'Ut tellus mi, commodo ut purus nec, facilisis venenatis dui.'];
    }

    setComment(image) {
        let count = Math.floor(Math.random() * (12 - 2)) + 2;
        let comments = [];
        for (let i = 0; i < count; i++) {
            let comment = {
                id: GUID(2),
                own: this.nicknames[Math.floor(Math.random() * this.nicknames.length) ],
                text: this.comments[Math.floor(Math.random() * this.comments.length)],
                date: this.randomDate(new Date(2012, 0, 1), new Date())
            };
            comments.push(comment);
        }
        image.comments = comments;
    }

    setLikes(image) {
        let count = Math.floor(Math.random() * (12 - 2)) + 2;

        let likes = [];
        for (let i = 0; i < count; i++) {
            let like = {
                own: GUID(2)
            };
            let o = Math.floor(Math.random() * 10);
            if(o <= 5){
                like.like_type = 'like';
            }else if( o > 5 ){
                like.like_type = 'dislike';
            }
            likes.push(like);
        }
        image.image_likes = likes;
    }

    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
}