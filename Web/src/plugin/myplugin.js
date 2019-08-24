module.exports = class Myplugin {
    // 接手参数
    constructor(options) {
        this.options = options
    }

    /**
     * apply：函数能够用来访问 webpack 的核心 
     * compiler：包含很多hooks
     * compilation：写入文件*/ 
    apply(compiler) {
        // console.log(this.options.name);
        // console.log(compiler)
        compiler.plugin('emit', (compilation, next) => {
            // console.log(compilation)

            next()
        })
    }
}