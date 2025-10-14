////////////////////////////////////////////////Var/////////////////////////////////////////////////////////////
//At first glance var works exactly like let, however there are some differences
//1)Var ingnores blocks of code, or var doesnt have block scope
let exam = true
if(exam){
 var hi = "Hello"
} 
console.log(hi);//Hello
//It just ignores the curly braces
//while let cant do that
// if(exam){
//   let my = "mine"
// }
// console.log(my);//error

//Even in for loop var ignores braces
for (var index = 0; index < 10; index++) {
  
}
console.log(index);//10

//however if we use var in function it will becaome a local variable for a function
// function checking() {
//   var check = "hello world"
// }
// console.log(check);//error

function example() {
  if(exam){
    var functVar = "sam" 
  }
  console.log(functVar);//sam
}
example()

//So the reason why var is so specific is that in past there was no lexicalEnvironment

//2)Var can be declarated twice
var user = "Me"
var user = "them"
var user = "hers"
console.log(user);//hers
//the same with let would be an error

//3) var can be used before its declaration
//such behavior is called hoisting
function sayHi() {
  phrase = "hi";

  console.log(phrase);

  var phrase;//hi
}
sayHi(); 
//so why is that?
//Hoisting means that while creation process the variables without the value are coming to the top and being read first. For example this code:
console.log(ok);//undefined,will explain later
var ok = "guess"
//javascript will see like this:
var ok;
console.log(ok);
ok = "guess"
//in this example as it was explained in the last topic, in cretion phase variables are read without values
//so it is not only var that is read like this, let and const are the same, however both let and const will be located in tdz(temporal dead zone) it means that any usage of let or const before initialization will be an error while "var" is doesnt have tdz instead it will be undefined. This is bad because undefined could confuse people
  function sayHello() {
  phrase = "ih"; // (*)

  if (false) {
    var phrase;
  }

  console.log(phrase);//ih
}
sayHello();
//the reason this code is working is that var is coming to the beginning and function looks like this:
 /*
 function sayHello() {
  var phrase;
  phrase = "ih"; // 

  if (false) {
  var phrase => will come here after cretion phase
  }

  console.log(phrase);//ih
}
sayHello();
 */
//Note var comes to the beginnig without = part, so var hello = "hello world", would be  var hello

//IIFE=>Immediately-invoked function expressions
//this method makes var to have block scope
//so this is how it looks:
(function() {

  var message = "hi";

  console.log(message);//hi

})();//< == we need this () to make the function, it is like calling functions: hello(), and ()that cover is neede to say that this is expression not statement, we need because function declaration is a statement which do not support immediate invoke, unlike function expression, we dont need to cover the function to () only there are other methods also:
/*
(function() { ... })(); // стандартно
(function() { ... }()); // тоже работает
!function() { ... }();  // через оператор !
+function() { ... }();  // через + превращаем в выражение
*/
var count = 10;

(function() {
  var count = 5; // это другая переменная!
  console.log("Inside:", count);
})();

console.log("Outside:", count);
//in this example because we use IIFE we dont change the global variable, it just has inner lexical environment and doesnt have the outer one
