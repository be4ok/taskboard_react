import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteProjectBoard} from "../../actions/projectBoardActions";
import {getProjectTaskCount} from "../../actions/projectTaskActions";
import axios from "axios/index";
import {PROXY_LINK} from "../../proxy";

class BoardItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskCount: 0
        }
    }


    clickOpenBoardHandle() {
        window.location.assign("/board/" + this.props.board.id + "/taskboard");
    }

    componentDidMount() {

        const {board} = this.props;

        axios.get(`${PROXY_LINK}/api/boards/${board.id}/count`)
            .then(res => this.setState({taskCount: res.data}));
    }

    remove(pb_id) {
        this.props.deleteProjectBoard(pb_id);
    }

    render() {

        const {board} = this.props;

        return (
            <div className="container">
                <div className="card card-body border-primary bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <span className="mx-auto">#{board.id}
                                <p className="task-count">Tasks: {this.state.taskCount}</p>
                                </span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>{board.name}</h3>
                            <p>{board.description}</p>
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                            <ul className="list-group">
                                <Link to={`/board/${board.id}/taskboard`}>
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered pr-1"> Open Board </i>
                                    </li>
                                </Link>
                                <Link to={`/board/edit/${board.id}`}>
                                    <li className="list-group-item update">
                                        <i className="fa fa-edit pr-1"> Update Project Info</i>
                                    </li>
                                </Link>

                                <li
                                    className="list-group-item delete"
                                    onClick={this.remove.bind(this, board.id)}
                                >
                                    <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

BoardItem.propTypes = {
    deleteProjectBoard: PropTypes.func.isRequired,
    //getProjectTaskCount: PropTypes.func.isRequired,
    //project_task_count: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    //project_task_count: state.project_task.project_task_count
});

export default connect(mapStateToProps, {deleteProjectBoard, getProjectTaskCount})(BoardItem);