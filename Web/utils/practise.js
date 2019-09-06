// 原型链，Object、function（鸡与鸡蛋问题）
/**
 * 当 new 一个函数的时候会创建一个对象，『函数.prototype』 等于 『被创建对象.__proto__』
 * 一切函数都是由 Function 这个函数创建的，所以『Function.prototype === 被创建的函数.__proto__』
 * 一切函数的原型对象都是由 Object 这个函数创建的，所以『Object.prototype === 一切函数.prototype.__proto__』
 */
Object.prototype.a = 'Object';
Function.prototype.a = 'Function';

function Person() {}
var child = new Person();
console.log(Person.a);
console.log(child.a);
console.log(child.__proto__.__proto__.__proto__.constructor.constructor.constructor)

//代码1
function People(){}
var p = new People()
p.__proto__ === People.prototype 
People.__proto__ === Function.prototype
People.prototype.__proto__ === Object.prototype

//代码2
Function.prototype === Function.__proto__         
Function.prototype === Object.__proto__           
Function.prototype.__proto__ === Object.prototype 
Function instanceof Object

//代码3
Object instanceof Function
Function instanceof Object
Function instanceof Function
Object instanceof Object