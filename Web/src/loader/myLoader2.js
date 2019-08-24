module.exports = function (src) {
    src = src.split('').reverse().join('');
    return `module.exports = '${src}'`;
}