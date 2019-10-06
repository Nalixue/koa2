var obj = {
    a: 1
}
function func(age, name) {
    console.log(age);
    console.log(name);
    console.log(this.a);
}
// 目的：func.mycall(obj, 12, 'nana')

Function.prototype.mycall = function() {
    // console.log(context, '1111');
    // console.log(this, '8888888');  this就是方法
    var context = arguments[0];
    context.fn = this;
    var argsLen = arguments.length;

    var args = [];
    for (var i = 1; i < argsLen; i++) {
        args.push(arguments[i]);
    }
    // console.log(arguments,'args');
    var result = context.fn(...args);
    delete context.fn;
    // return result;
}

func.mycall(obj, 12, 'nana')


// Function.prototype.call2 = function(context) {
//     context.fn = this;
//     var args = [];
//     for(var i = 1, len = arguments.length; i < len; i++) {
//         args.push('arguments[' + i + ']');
//     }
//     eval('context.fn(' + args +')');
//     delete context.fn;
// }

// // 测试一下
// var foo = {
//     value: 1
// };

// function bar(name, age) {
//     console.log(name)
//     console.log(age)
//     console.log(this.value);
// }

// bar.call2(foo, 'kevin', 18); 
