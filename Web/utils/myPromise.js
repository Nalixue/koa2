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

function Promise(executor) {
    var self = this;
    self.status = 'pendding'; // pendding, reject, resolve

    function resolve(value) {

    }
    function reject(reason) {

    }
    try {
        executor();
    } catch (e) {
        reject(e);
    }
    
}