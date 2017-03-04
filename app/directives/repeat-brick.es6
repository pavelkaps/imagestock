class RepeatBrick{
    constructor(scope, element, attrs){
        if (scope.$last){
            console.log("emmit");
            scope.$emit('LastBrick');
        }
    }
    
    static getInstance(){
        return new RepeatBrick();
    }
}

export {RepeatBrick}