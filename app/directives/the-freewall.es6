class TheFreeWall{
    constructor(scope, element, attrs){
        scope.$on('LastBrick', (event)=>{
            var wall = new Freewall(".galleryGrid");
            console.log("directive");
            wall.reset({
                selector: '.card',
                animate: true,
                cellW: 238,
                cellH: 190,
                gutterX: 10,
                gutterY: 10,
                onResize: function() {
                    wall.fitHeight(590);
                }

            });

            wall.container.find('.card').on('load', (() => {
                wall.fitHeight(590);
            }));

            $window.dispatchEvent(new Event('resize'));

        });
    }

    static getInstance(){
        return new TheFreeWall();
    }
}

export {TheFreeWall}