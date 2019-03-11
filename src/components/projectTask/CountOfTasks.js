import React, {Component} from 'react';
import axios from "axios/index";
import {PROXY_LINK} from "../../proxy";

class CountOfTasks extends Component{

    constructor(props) {
        super(props);
        this.state = {
            count: ""
        }
    }

/*    componentWillMount() {
        fetch(`/api/boards/${this.props.board.id}/count`)
            .then(response => response.json())
            .then(data => this.setState({
                count: data
            }))
    }*/

    componentWillMount() {

        axios.get(`${PROXY_LINK}/api/boards/${this.props.board.id}/count`)
            .then(res => this.setState({
                count: res.data,
            }));

    }

    render() {

        const {count} = this.state;

        return(
            <p className="task-count">Tasks: {count}</p>
        );
    }
}

export default CountOfTasks