function RepeatBrick(){
    return (scope, element, attrs) => {
        console.log('repeat directive');
        if (scope.$last){
            scope.$emit('LastBrick');
        }
    }
}

export {RepeatBrick}