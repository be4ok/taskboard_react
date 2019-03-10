import React, {Component} from 'react';
import axios from "axios/index";

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

        axios.get(`/api/boards/${this.props.board.id}/count`)
            .then(res => this.setState({
                count: res.data,
            }));

    }

    render() {

        const {count} = this.state;

        return(
            <span>{count}</span>
        );
    }
}

export default CountOfTasks