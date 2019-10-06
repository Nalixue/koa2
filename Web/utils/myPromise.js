/**
 * 返回是一个promise  
 * promise2 = promise1.then(alert)
 * promise2 != promise1 */

 /**
  * 使用：var promise = new Promise(function(resolve,reject){
  * resolve(value) // 成功
  * reject(reason) // 错误
  * })
  */

  /**
   * 
   * 参考：https://imweb.io/topic/5bbc264b6477d81e668cc930
   * 根据Promise规范实现Promise，主要是发布订阅模式
   * then() 函数会返回一个全新的 Promise
   * doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);


const p = new MyPromise(function(resolve, reject) {
  setTimeout(function() {
    resolve(1);
  }, 2000);
});

p.then(function(v) {
  console.log(v);
  return 2;
}).then(function(v) {
  console.log(v);
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(3);
    }, 3000);
  });
}).then(function(v) {
  console.log(v);
});
   */
/**
 * 
 * @param {*} fn 
 * 首先写出Promise的构造函数，Promise使用的是发布与订阅模式，
 * 调用promise上的then方法将resolve和reject回调分别加入onFulfilledCallback和onRejectedCallback回调函数集合
 * 然后调用resolve和reject方法触发回调函数集合中函数的执行
 */
 function MyPromise(fn) {
    var self = this;
    self.data = ''; // Promise的值
    self.status = 'pending'; // Promise初始状态为pending
    self.onFulfilledCallback = []; // Promise resolve回调函数集合
    self.onRejectCallback = [];
    function resolve(value) {
        if (self.status === 'pending') {
            console.log(self.onFulfilledCallback, 'resolve self.onFulfilledCallback')
            self.status = 'resolved';
            self.data = value;
            setTimeout(function() {
                self.onFulfilledCallback.forEach(function (item) {
                    item(value);
                }) 
            });
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            console.log(self.onRejectCallback, 'reject self.onRejectCallback')
            self.status = 'reject';
            self.data = reason;
            setTimeout(function() {
                self.onRejectCallback.forEach(function (item) {
                    item(reason);
                })
            });
        }
    }
    try {
        fn(resolve, reject); // 执行传进来的函数，传入resolve, reject参数  resolve和reject主要做的就是修改promise的状态
    } catch(e) {
        reject(e);
    }
    
 }

 // Promise对象有一个then方法，用来注册Promise对象状态确定后的回调。这里需要将then方法定义在Promise的原型
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    console.log(onFulfilled,onRejected, '11111')
    var self = this;
    // 根据标准，如果then的参数不是function，则我们需要忽略它
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(v) { return v};
    onRejected = typeof onRejected === 'function' ? onRejected : function (r) { return r };
    
    // return new MyPromise(function(resolve, reject) {
         // Promise对象存在以下三种状态，对三种状态采用不同处理
        if(self.status === 'resolved') {
             return new MyPromise(function(resolve, reject) {
                try {
                    // ret是onFulfilled的返回值
                    var ret = onFulfilled(self.data);
                    if (ret instanceof MyPromise) {
                      // 如果ret是一个promise，则取其值作为新的promise的结果
                      ret.then(resolve, reject);
                    } else {
                      // 否则，以它的返回值作为新的promise的结果
                      resolve(ret);
                    }
                  } catch (e) {
                    // 如果出错，以捕获到的错误作为promise2的结果
                    reject(e);
                  }
                
             })
        }
        if(self.status === 'reject') {
            return new MyPromise(function(resolve, reject) {
                try{
                    var ret = onRejected(self.data);
                    if(ret instanceof MyPromise) {
                        ret.then(resolve, reject);
                    } else {
                        resolve(ret);
                    }
                } catch (e) {
                    reject(e)
                }
            })
        }
        if(self.status === 'pending') {
            return new MyPromise(function(resolve, reject) {
                self.onFulfilledCallback.push(function (value) {
                    // setTimeout(function () {
                        try {
                            var ret = onFulfilled(self.data);
                            if (ret instanceof MyPromise) {
                                ret.then(resolve, reject)
                            } else {
                                resolve(ret);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    // })
                });
                self.onRejectCallback.push(function (value) {
                    // setTimeout(function () {
                        try {
                            var ret = onRejected(self.data);
                            if (ret instanceof MyPromise) {
                                ret.then(resolve, reject);
                            } else {
                                reject(ret);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    // })
                });
            })
        }
    // })
}

// 顺便实现一下catch方法
// MyPromise.prototype.catch = function(onRejected) {
//     return this.then(null, onRejected);
// }