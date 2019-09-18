import React from 'react';
// import request from '../../utils/request';
import RouterHoc from './routerHOC';

class RouterDemo extends React.Component{
    componentDidMount() {
        this.getRequest();
        
    }
    async getRequest() {
        const res = await request('/a');
        console.log(res,'8888888')
    }

    render() {
        // const Comp = compMap[this.props.hash || '/hello']
        return (
            <div>
                <a href="#/world">跳1</a>
                <a href="#/hello">跳2</a>
                {/* <Comp/> */}
            </div>
        )
    }
}

export default RouterHoc(RouterDemo);