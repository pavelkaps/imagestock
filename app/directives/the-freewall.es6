function  TheFreeWall($window){
    return (scope, element, attrs) => {
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
            
            scope.wall = wall;
            wall.container.find('.card').on('load', (() => {
                wall.fitHeight(590);
            }));
            $window.dispatchEvent(new Event('resize'));

        });
    }
}

TheFreeWall.$inject = ['$window'];
export {TheFreeWall}