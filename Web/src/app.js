import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RouterDemo from './routerDemo/index.jsx';

// // const routerList = routerMap.map((item) => {
// //     return (
// //         <Route path={item.path} component={item.component} />
// //     )
// // });

ReactDOM.render(
    <Router>
    <Route path="/" component={RouterDemo}>

    </Route>
  </Router>,
    document.getElementById('app')
)