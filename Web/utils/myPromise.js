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

 function MyPromiese(fn) {
    var self = this;
    self.data = ''; // Promise的值
    self.status = 'pending'; // Promise初始状态为pending
    self.onFuilCallback = []; // Promise resolve回调函数集合
    self.onRejectCallback = [];
    function resolve(value) {
        if(self.status === 'pending') {
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
        if(self.status === 'pending') {
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
        fn(resolve, reject); // 执行传进来的函数，传入resolve, reject参数
    } catch(e) {
        reject(e);
    }
    
}
MyPromiese.prototype.then = function (onFulfilled, onRejected) {
    var self = this;
    // 根据标准，如果then的参数不是function，则我们需要忽略它
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(v) { return v};
    onRejected = typeof onRejected === 'function' ? onRejected : function(r) { return r };
    return new MyPromiese(function(resolve, reject) {
         // Promise对象存在以下三种状态，对三种状态采用不同处理
        if(self.status === 'resolved') {
             return new MyPromiese(function(resolve, reject) {
                try {
                    // ret是onFulfilled的返回值
                    var ret = onFulfilled(self.data);
                    if (ret instanceof Promise) {
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
            return new MyPromiese(function(resolve, reject) {
                try{
                    var ret = onRejected(self.data);
                    if(ret instanceof MyPromiese) {
                        ret.then(ret);
                    } else {
                        resolve(ret);
                    }
                } catch (e) {
                    reject(e)
                }
            })
        }
        if(self.status === 'pending') {
            return new MyPromiese(function(resolve, reject) {
                self.onFuilCallback.push(function (value) {
                    try {
                        var ret = onFulfilled(self.data);
                        if (ret instanceof MyPromiese) {
                            ret.then(resolve, reject)
                        } else {
                            resolve(ret);
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
                self.onRejectedCallback.push(function(value) {
                    try {
                      var ret = onRejected(self.data);
                      if (ret instanceof Promise) {
                        ret.then(resolve, reject);
                      } else {
                        reject(ret);
                      }
                    } catch (e) {
                      reject(e);
                    }
                  });
            })
        }
    })
}

// 顺便实现一下catch方法
MyPromiese.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
  }