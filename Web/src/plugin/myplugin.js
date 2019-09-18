module.exports = class Myplugin {
    // 接手参数
    constructor(doneCallback, failCallback) {
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }

    /**
     * apply：函数能够用来访问 webpack 的核心 
     * compiler：包含很多hooks 对象可在整个编译生命周期访问
     * compilation：写入文件*/ 
    apply(compiler) {
        compiler.plugin('done', (res) => {
            this.doneCallback(res);
        });
        compiler.plugin('failed', (res) => {
            this.failCallback(res);
        });
        // compiler.plugin('run', (res) => {

        // });
    }
}