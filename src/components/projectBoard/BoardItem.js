import React, {Component} from 'react';
import {Link} from "react-router-dom";
import CountOfTasks from '../projectTask/CountOfTasks';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteProjectBoard} from "../../actions/projectBoardActions";
import {getProjectTaskCount} from "../../actions/projectTaskActions";

class BoardItem extends Component {

    clickOpenBoardHandle() {
        window.location.assign("/board/" + this.props.board.id + "/taskboard");
    }

    remove(pb_id) {
        this.props.deleteProjectBoard(pb_id);
    }

    render() {

        const {board} = this.props;



        return (
            <div className="col-sm-6">
                <div className="card border-primary mb-3">
                    <div onClick={this.clickOpenBoardHandle.bind(this)} className="card-header board-item">

                        <div className="board-id">#{board.id}</div>
                        <div className="task-count">Tasks: <CountOfTasks board={board}/></div>

                        </div>

                    <div className="card-body">
                        <h5 className="card-title">{board.name}</h5>
                        <p className="card-text">{board.description}</p>

                        <Link to={"/board/" + board.id + "/taskboard"} className="btn btn-outline-success btn-sm">
                            Open
                        </Link>

                        <Link to={"/board/edit/" + board.id} className="btn btn-outline-primary btn-sm ml-4">
                            Edit
                        </Link>

                        <button
                            className="btn btn-outline-danger ml-4 btn-sm"
                            onClick={this.remove.bind(this, board.id)}
                        >
                            Delete
                        </button>
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