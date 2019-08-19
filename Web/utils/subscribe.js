function Events() {
    this.handles = {};

    this.on = function (eventName, callBack) {
        if (!this.handles[eventName]) {
            this.handles[eventName] = [];
        }
        this.handles[eventName].push(callBack);
    };

    this.emit = function (eventName, obj) {
        if (this.handles[eventName]) {
            this.handles[eventName].forEach(element => {
                element(obj);
            });
        }
    },


    this.off = function (eventName, func) {
        if (this.handles[eventName]) {
            delete this.handles[eventName]
        }
    }
    return this;
}
var a = new Events();
a.on('key', function (name) {
    console.log('hello', name);
});
a.emit('key', 'nana');

// // 把所有的key 和fn存储在obj对象中，在trriger时找到key对应的fn，apply调用
// Events = function () {
//     var listen, obj, one, remove, trigger, __this;
//     obj = {};
//     __this = this;

//     listen = function (key, eventfn) { //把简历扔盒子, key就是联系方式.
//         var stack = obj[key] ? obj[key] : obj[key] = [];
//         return stack.push(eventfn);
//     };

//     one = function (key, eventfn) {
//         remove(key);
//         return listen(key, eventfn);
//     };

//     remove = function (key) {
//         return obj[key] ? obj[key].length = 0 : void 0;
//     };

//     trigger = function () {  //面试官打电话通知面试者
//         var fn, stack, key;
//         key = Array.prototype.shift.call(arguments);
//         stack = obj[key] ? obj[key] : obj[key] = [];
//         for (var _i = 0; _i < stack.length; _i++) {
//             fn = stack[_i];
//             if (fn.apply(__this, arguments) === false) {
//                 return false;
//             }
//         }
//     }
//     return {
//         listen: listen,
//         one: one,
//         remove: remove,
//         trigger: trigger
//     }
// }
// // 订阅者
// var adultTv = Events();
// adultTv.listen('play',  function( data ){
//     alert ( "今天是谁的电影" + data.name );
// });
// //发布者