import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteProjectTask} from "../../actions/projectTaskActions";


class TaskItem extends Component {

    remove(pt_id) {
        this.props.deleteProjectTask(pt_id, this.props.history)
    }

    render() {

        const task = this.props.task;

        if (task === undefined) {
            return <div className="card-header text-center alert-info">No tasks</div>
        }

        return (

            <div className="card mb-1 bg-light mb-3">

                <div className="card-header text-primary">
                    #{task.id}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{task.summary}</h5>
                    <p className="card-text text-truncate ">{task.acceptanceCriteria}</p>
                    <Link to={"/board/" + task.board.id + "/updatetask/" + task.id} className="btn btn-outline-primary btn-sm">
                        View / Update
                    </Link>

                    <button
                        className="btn btn-outline-danger ml-4 btn-sm"
                        onClick={this.remove.bind(this, task.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

TaskItem.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired
};

export default connect(null, {deleteProjectTask})(TaskItem);