export class ImageResizer {
    constructor() {
        this.stylesCardWidth = [
            {
                width: 'width-1-col'
            },
            {
                width: 'width-2-col'
            }];

        this.stylesCardHeight = [
            {
                height: 'height-1-col'
            },
            {
                height: 'height-2-col'
            }];
    }

    getWidthSize() {
        var digit = Math.random();

        if (digit < 0.5) {
            return this.stylesCardWidth[0].width;
        } else {
            return this.stylesCardWidth[1].width;
        }
    };

    getHeightSize() {
        var digit = Math.random();
        if (digit < 0.5) {
            return this.stylesCardHeight[0].height;
        } else {
            return this.stylesCardHeight[1].height;
        }
    };
}