//function
function greet(){
    console.log("hello")
}
// greet()


function add(num1,num2){
    let sum = num1 + num2
    console.log(sum);
    
}
// add(1,2)

                         
function loginMessage(user = "sam"/*default value to be used*/){
    return `${user} just logged in`
}
// console.log(loginMessage("vhdfhkjb"));
// console.log(loginMessage());




//QUESTION -  Write a JavaScript function named userLoginMessage that:
// 1. Accepts a username as a parameter.
// 2. Uses "Sam" as the default username.
// 3. Checks whether the username is empty.
// 4. If empty, prints "Please enter a username" and stops the function.
// // 5. Otherwise, returns a message in this format: "Biswajit just logged in".

function userLoginMessage(userName = "sam"){
    if(!userName){
        return "Please enter your name "
    }
    else{
            return `${userName} just logged in`
    }

}

// console.log(userLoginMessage("Biswajit"))
// console.log(userLoginMessage(""))

// console.log(userLoginMessage())

//END


function hi(n) {
    console.log(`${n}hhhh`);
}

console.log(hi(""));



