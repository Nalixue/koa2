/**
 * 遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入
 * 放入node运行时去执行，并将结果拼接到打包好的module中
 */
const ctx = require.context('../mock', true, /(.js)$/);
let routes = [];

ctx.keys().forEach((file) => {
    console.log(file, '******')
    const content = ctx(file).default;
    if (Object.prototype.toString.call(content) === '[object Object]') {
        routes.push(content);
    } else {
        console.warn(`mock文件${file}格式错误`);
    }
});

export default routes;