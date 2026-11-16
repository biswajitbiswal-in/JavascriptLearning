function Person(name,age){
    this.name = name
    this.age = age
}

function Car(make,model){
   this.make = make
    this.model = model
}

let myCar = new Car("Mercedes","G-WAGON")
// console.log(myCar);

let myNewCar = new Car("Mahindra","XUV700")
// console.log(myNewCar);

function Tea(type){
    this.type = type
    this.describe = function(){
        return `this id a cup of ${this.type}`
    }
}

let lemonTea = new Tea("Lemon tea")
// console.log(lemonTea.describe()




function Animal(specis){
    this.specis = specis
}


Animal.prototype.sound = function(){
    return `${this.specis} makes a sound `
}

let dog = new Animal("Dog")
// console.log(dog);
// console.log(dog.sound());


function Drink(name){
    if(!new.target){
        throw new Error("Drink must be called with new keyword");
        
    }
    this.name = name
}

let tea =new Drink("lemon")
let cofee = Drink()
