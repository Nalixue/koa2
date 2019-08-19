
import React, { Component } from 'react';
import hashchangeHOC from './routerHOC.jsx';

const compMap = {
    '/hello': () => <div>hello 页</div>,
    '/world': () => <div>world 页</div>,
}

class App extends Component {
  render() {
    const Comp = compMap[this.props.hash || '/hello']
    return (
      <div>
        <div>导航栏 <a href="#/world">跳转到 world 页</a> <a href="#/hello">跳转到hello页</a></div>
        <Comp/>
    </div>
    )
  }
}
export default hashchangeHOC(App);

