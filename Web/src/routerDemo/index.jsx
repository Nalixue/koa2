import React from 'react';
import request from '../../utils/request';

export default class a extends React.Component{
    componentDidMount() {
        this.getRequest();
        
    }
    async getRequest() {
        const res = await request('/a');
        console.log(res,'8888888')
    }
    render() {
        return (
            <div>6666666666</div>
        )
    }
}