// import React, { Component } from 'react';

// export default class RouterHDC extends Component {
//     hansChange = () => {
//         const hash = window.location.hash;
//         const path = hash.slice(1);
//     }

//     componentDidMount() {
//         window.addEventListener('hashchange', this.hansChange);
//     }
//     componentUnMount
// }

import React, {Component} from 'react'

export default function hashchangeHOC(WrappedComp) {

 class Comp extends Component {
    state = {
      hash: window.location.hash.slice(1)
    }
    
    handleHashChange = () => {
      const path = window.location.hash.slice(1)
      this.setState({hash: path})
    }

    componentDidMount() {
      window.addEventListener('hashchange', this.handleHashChange)
      this.handleHashChange()
    }
  
    componentWillUnmount() {
      window.removeEventListener('hashchange', this.handleHashChange)
    }

    render() {
      return (
        <WrappedComp {...this.props} hash={this.state.hash} />
      )
    }
  }
  
  return Comp
}