var obj = {
    a: 1
}
function func(age, name) {
    console.log(age);
    console.log(name);
    console.log(this.a);
}
// 目的：var a = func.mybind(obj, 12, 'nana'); a();

Function.prototype.mybind = function() {
    var self = this;
    var context = arguments[0];
    var params = Array.prototype.slice.call(arguments, 1);
    return function () {
        console.log('5555', this); // 闭包的this只想windows
        self.apply(context, params);
    }
}

var funcbind = func.mybind(obj, 12, 'nana');
funcbind();