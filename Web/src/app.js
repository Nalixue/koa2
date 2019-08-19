import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RouterDemo from './routerDemo/index.jsx';
// import RouterHOC from './hoc/index.jsx';
// import routerMap from './routerMap';

// const routerList = routerMap.map((item) => {
//     return (
//         <Route path={item.path} component={item.component} />
//     )
// });

ReactDOM.render(
  <Router>
    {/* {routerList} */}
    <Route path="/" component={RouterDemo}></Route>
    {/* <Route path="/routerHOC" component={RouterHOC}></Route> */}
  </Router>,
  document.getElementById('app')
)