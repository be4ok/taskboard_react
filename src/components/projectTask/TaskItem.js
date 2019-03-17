import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteProjectTask, cleanErrors} from "../../actions/projectTaskActions";
import {ButtonToolbar} from "react-bootstrap";
import UpdateTask from "./UpdateTask"


class TaskItem extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false
        };

        this.modalClose = this.modalClose.bind(this);
        this.modalOpen = this.modalOpen.bind(this)
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

    render() {

        const {task} = this.props;

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
                    <p className="date-info">created: {task.createDate}</p>
                    {task.updateDate && <p className="date-info">updated: {task.updateDate}</p>}
                    <br/>

                    <ButtonToolbar>

                        <div
                            className="btn btn-outline-primary btn-sm"
                            onClick={this.modalOpen}
                        >
                            Update
                        </div>

                        <UpdateTask
                            pt_id={task.id}
                            show={this.state.modalShow}
                            onHide={this.modalClose}
                        />
                    </ButtonToolbar>

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
    deleteProjectTask: PropTypes.func.isRequired,
    cleanErrors: PropTypes.func.isRequired
};

export default connect(null, {deleteProjectTask, cleanErrors})(TaskItem);