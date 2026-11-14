// Task 1:
// Write a function stringToNumber that takes a string input
// and tries to convert it to a number.
// If the conversion fails, return "Not a number".


// Task 2:
// Write a function flipBoolean that takes any input,
// converts it to its Boolean equivalent, and then flips it.
// Example: true -> false, 0 -> true.


// Task 3:
// Write a function whatAmI that takes an input and returns
// a string describing its type after conversion.
// If it's a number, return "I'm a number!".
// If it's a string, return "I'm a string!".


// Task 4:
// Write a function isItTruthy that takes an input
// and returns "It's truthy!" if the value is truthy in JavaScript,
// or "It's falsey!" if the value is falsy in JavaScript.
function stringToNumber(input) {
    const converted = Number(input);
    return Number.isNaN(converted) ? "Not a number" : converted;
}

function flipBoolean(input) {
    return !Boolean(input);
}

function whatAmI(input) {
    
    if (typeof input === "number") {
        return "I'm a number!";
    }
    return "I'm a string!";
}

function isItTruthy(input) {
    if(input){
        return  "It's truthy!"
    }else{
        return "It's falsey!"
    }
    
}
console.log(stringToNumber("hello"))
console.log(flipBoolean(true))
console.log(whatAmI("DKJBFBDKGN"))
console.log(isItTruthy(0))

