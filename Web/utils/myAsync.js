/**
 * 使用方式：
 * async function foo() {
 *  await bar()
 * }
 */

function runnner(func) {
    const itr = func();
    function run(arg) {
        const result = itr.next(arg);
        if (result.done) {
            return result.value;
        } else {
            return Promise.resolve(result.value).then(run);
        }
    }
    return run();
}

function* init() {
    const res1 = yield setTim();
    console.log(res1);
    const res2 = yield setTim();
    console.log(res2);

}

const setTim = function () {
    setTimeout(() => {
        console.log(1);
        return 3;
    }, 1000);
}

runnner(init)