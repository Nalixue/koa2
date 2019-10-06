const createStore = (reducer, initState) => {
    let state = initState;

    let listeners = [];
    // 订阅
    function subscribe(listener) {
        listeners.push(listener);
    }

    function dispatch(action) {
        state = reducer(state, action);
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }

    function getState() {
        return state;
    }
    // 给action.type一个默认值，如果都不匹配就返回自己初始的state
    dispatch({
        type: Symbol()
    })
    return {
        subscribe,
        dispatch,
        getState
    }
}

/** combineReducer */
function combineReducer(reducers) {

    return function combination(state = {}, action) {
        let nextState = {};
        // todo: 这里不太对呀，返回的值不对
        Object.keys(reducers).forEach((i) => {
            const reducer = reducers[i];
            const prevStateForKey = state[i];
            nextStateForKey = reducer(prevStateForKey, action);
            nextState[i] = nextStateForKey
        });
        console.log(nextState, 'nextState111')
        return nextState;
    }
}

/** loggerMiddleware */
// const store = createStore(reducer);
// const next = store.dispatch;
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('this state', store.getState())
    console.log('action', action)
    next(action);
    console.log('next state', store.getState())
}
// store.dispatch = (next) => (action) => {
//     try {
//         next(action);
//     } catch (err) {
//         console.log(err, '错误报告')
//     }
// }

/** exceptionMiddleware */
const exceptionMiddleware = (store) => (next) => (action) => {
    try {
        next(action);
    } catch (err) {
        console.error('错误报告6', err);
    }
}


// 使用
let initState = {
    count: 1,
    info: '一次',
}

function countReducer(state, action) {
    // 这里的state是state.count
    state = state || initState;

    switch (action.type) {
        case 'INCREASE': 
            return {
                count: state + 1,
            }
        case 'DECREMENT': 
            return {
                count: state - 1,
            }
        default:
            return state
    }
}

function infoReducer(state, action) {
    switch (action.type) {
        case 'HI':
            return {
                info: 'HI' + state,
            }
    }
}

const reducer = combineReducer({
    count: countReducer,
    info: infoReducer,
})

const store = createStore(reducer, initState);

store.subscribe(() => {
    let state = store.getState();
    console.log(state, '输出答案');
})

store.dispatch({
    type: 'INCREASE',
});

// const store = createStore(reducer);
const next = store.dispatch;
const logger = loggerMiddleware(store);
const exception = exceptionMiddleware(store);
store.dispatch = exception(logger(next));

const applyMiddleware = function (...middleware) {
    return function rewriteCreateStoreFunc(oldCreateStore) {
        return function newCreateStore(reducer, initState) {
        /** 生成store */
            const store = oldCreateStore(reducer, initState);
        /** 给每个middleware传入store */
            const chain = middleware.map(middleware => middleware(store));
            let dispatch = store.dispatch;
            chain.reverse().map(middleware => {
                dispatch = middleware(dispatch);
            });
            store.dispatch = dispatch;
            return store;
        }
    }
}
