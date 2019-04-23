import React, {Component} from 'react';
import classnames from "classnames";
import validationUtils from "../../utils/validationUtils";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addProjectTask} from "../../actions/projectTaskActions";
import {Modal} from "react-bootstrap";

class AddTask extends Component {

    emptyTask = {
        id: '',
        summary: '',
        acceptanceCriteria: '',
        status: '',
        priority: 'LOW',
        board: {
            id: ''
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            task: this.emptyTask,
            isSaving: false,
            errors: {},
            pb_id: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            errors: nextProps.errors,
            pb_id: nextProps.pb_id
        });
    }

    onChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        let task = {...this.state.task};
        task[name] = value;
        this.setState({task});
    }

    async onSubmit(e) {
        e.preventDefault();

        this.setState({isSaving: true});

        const {task} = this.state;
        task.board.id = this.state.pb_id;

        await this.props.addProjectTask(task, task.board.id, this.props.sorting);

        this.setState({isSaving: false});

        const {errors} = this.state;

        if (!Object.keys(errors).length) {
            this.props.onHide();
            this.setState({task: this.emptyTask})
        }
    }

    render() {

        const {task, errors} = this.state;
        const {show, onHide} = this.props;

        const summaryValidMessage = validationUtils(errors, 'summary');
        const acceptanceCritValidMessage = validationUtils(errors, 'acceptanceCriteria');

        return (

            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>

                <Modal.Body>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">

                                <h4 className="display-4 text-center">Add new Project Task</h4>

                                <form onSubmit={this.onSubmit}>

                                    <div className="form-group">

                                        <div className="title-input">Summary:</div>

                                        <div>
                                            <input
                                                autoFocus
                                                className={classnames("form-control form-control-lg", {"is-invalid": summaryValidMessage.length})}
                                                type="text"
                                                name="summary"
                                                placeholder="Project Task summary"
                                                value={task.summary}
                                                onChange={this.onChange}
                                                autoComplete="summary"
                                                id="summary"
                                                disabled={this.state.isSaving}
                                            />
                                        </div>

                                        {summaryValidMessage}

                                        <hr/>

                                    </div>

                                    <div className="form-group">

                                        <div className="title-input">Acceptance criteria:</div>

                                        <div>
                                    <textarea
                                        className={classnames("form-control form-control-lg", {"is-invalid": (acceptanceCritValidMessage.length || task.acceptanceCriteria.length > 200)})}
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        value={task.acceptanceCriteria}
                                        onChange={this.onChange}
                                        disabled={this.state.isSaving}
                                    />
                                            <span
                                                className={classnames("input-length", {"input-length-alert": task.acceptanceCriteria.length > 200})}>
                                            {200 - task.acceptanceCriteria.length}
                                            </span>
                                        </div>

                                        {acceptanceCritValidMessage}

                                        <hr/>

                                    </div>

                                    <div className="form-group">

                                        <div className="title-input">Status:</div>

                                        <select
                                            className="form-control form-control-lg"
                                            name="status"
                                            value={task.status}
                                            onChange={this.onChange}
                                            disabled={this.state.isSaving}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="TO_DO">TO DO</option>
                                            <option value="IN_PROGRESS">IN PROGRESS</option>
                                            <option value="DONE">DONE</option>
                                        </select>

                                    </div>


                                    <div className="form-group">

                                        <div className="title-input">Priority:</div>

                                        <select
                                            className="form-control form-control-lg"
                                            name="priority"
                                            value={task.priority}
                                            onChange={this.onChange}
                                            disabled={this.state.isSaving}
                                        >
                                            <option value="LOW">Low</option>
                                            <option value="MIDDLE">Middle</option>
                                            <option value="HIGH">High</option>
                                        </select>

                                    </div>

                                    <div className="buttons-container">
                                        <div className="buttons-group">

                                            <div
                                                onClick={this.props.onHide}
                                                className="btn btn-lg button-item btn-outline-danger"
                                            >
                                                Cancel
                                            </div>

                                            <input
                                                type="submit"
                                                value={!this.state.isSaving ? "Save" : "Saving..."}
                                                className="btn btn-outline-success btn-lg button-item"
                                                disabled={this.state.isSaving}
                                            />

                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        );
    }
}

AddTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {addProjectTask})(AddTask)