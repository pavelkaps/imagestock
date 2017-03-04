function RepeatBrick(){
    return (scope, element, attrs) => {
        if (scope.$last){
            console.log("emmit");
            scope.$emit('LastBrick');
        }
    }
}

export {RepeatBrick}