import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteProjectTask, cleanErrors, start, stop, finish} from "../../actions/projectTaskActions";
import {ButtonToolbar} from "react-bootstrap";
import UpdateTask from "./UpdateTask"


class TaskItem extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            task: {},
            modalShow: false
        };

        this.modalClose = this.modalClose.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    remove(pt_id) {
        this.props.deleteProjectTask(pt_id, this.props.history)
    }

    modalOpen() {

        this._isMounted = true;

        if (this._isMounted) {
            this.setState({
                modalShow: true
            });
        }

        this.props.cleanErrors();
    }

    modalClose() {

        if (this._isMounted) {
            this.setState({
                modalShow: false
            });
        }
    }

    onStartClick(pt_id) {

        this.props.start(pt_id, this.props.pb_id, this.props.sorting)
    }

    onStopClick(pt_id) {

        this.props.stop(pt_id, this.props.pb_id, this.props.sorting)
    }

    onFinishClick(pt_id) {

        this.props.finish(pt_id, this.props.pb_id, this.props.sorting)
    }

    render() {

        const {task} = this.props;

        if (task === undefined) {
            return <div className="card-header text-center alert-info">No tasks</div>
        }

        return (

            <div className="card mb-1 bg-light mb-3 f">

                <div className="f card-header text-primary">

                    <div className="float-left">#{task.id}</div>

                    <ButtonToolbar className="float-right">

                        <i
                            className="fas fa-pencil-alt text-success mr-2 task-action"
                            onClick={this.modalOpen}
                        >
                        </i>

                        <i
                            className="fas fa-trash-alt text-danger task-action"
                            onClick={this.remove.bind(this, task.id)}
                        >
                        </i>

                        <UpdateTask
                            pt_id={task.id}
                            show={this.state.modalShow}
                            onHide={this.modalClose}
                            sorting={this.props.sorting}
                        />

                    </ButtonToolbar>


                </div>

                <div className={"priority-" + task.priority.toLowerCase()}>
                </div>

                <div className="card-body bg-light">
                    <h5 className="card-title">{task.summary}</h5>
                    <p className="card-text">{task.acceptanceCriteria}</p>
                    <p className="date-info mb-0">created: {task.createDate}</p>
                    {task.updateDate && <p className="date-info mb-0">updated: {task.updateDate}</p>}
                    <br/>


                    <div className="d-flex justify-content-center">

                        {task.status !== "IN_PROGRESS" &&

                        <div
                            className={"btn btn-sm mr-4 ml-4 btn-outline-" + (task.status !== "DONE" ? "primary" : "secondary")}
                            onClick={this.onStartClick.bind(this, task.id)}
                        >
                            {task.status !== "DONE" ? "Start" : "Resume"}
                        </div>
                        }


                        {(task.status !== "TO_DO" && task.status !== "DONE") &&

                        <div
                            className="btn btn-outline-danger btn-sm mr-4 ml-4"
                            onClick={this.onStopClick.bind(this, task.id)}
                        >
                            Stop
                        </div>
                        }


                        {(task.status !== "TO_DO" && task.status !== "DONE") &&
                        <div
                            className="btn btn-outline-success btn-sm mr-4 ml-4"
                            onClick={this.onFinishClick.bind(this, task.id)}
                        >
                            Finish
                        </div>
                        }

                    </div>


                </div>
            </div>
        );
    }
}

TaskItem.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    finish: PropTypes.func.isRequired,
    cleanErrors: PropTypes.func.isRequired
};

export default connect(null, {deleteProjectTask, cleanErrors, start, stop, finish})(TaskItem);