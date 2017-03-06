function Back(){
    return (scope, element, attrs) => {
        element.css({
            'background-image': 'url(' + attrs.back + ')'
        });
        scope.$apply();
    }
}

export {Back}