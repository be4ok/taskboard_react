import React, {Component} from 'react';
import {Link} from "react-router-dom";
import classnames from "classnames";
import validationUtils from "../../validation/validationUtils";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addProjectTask, getProjectTask, updateProjectTask} from "../../actions/projectTaskActions";

class AddTask extends Component {

    emptyTask = {
        id: '',
        summary: '',
        acceptanceCriteria: '',
        status: '',
        board: {
            id: ''
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            task: this.emptyTask,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancelClickHandler = this.onCancelClickHandler.bind(this);

    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            errors: nextProps.errors
        });
    }

    onChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        let task = {...this.state.task};
        task[name] = value;
        this.setState({task});
    }

    onSubmit(e) {
        e.preventDefault();
        const {task} = this.state;
        task.board.id = this.props.match.params.id;

        this.props.addProjectTask(task, task.board.id, this.props.history)

        /*task.board.id = this.props.match.params.id;

        await fetch('../../api/boards/tasks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(responseObject => {
                if (!responseObject.ok) {
                    throw responseObject.json();
                }
                this.setState({validation: []});
                this.props.history.push("/board/" + this.props.match.params.id + "/taskboard");

            }).catch(error => {
                error.then(res => this.setState({validation: res}));
            });*/
    }

    onCancelClickHandler(e) {
        e.preventDefault();
        this.props.history.push("/board/" + this.props.match.params.id + "/taskboard");
    }

    render() {

        const {task, errors} = this.state;

        const summaryValidMessage = validationUtils(errors, 'summary');
        const acceptanceCritValidMessage = validationUtils(errors, 'acceptanceCriteria');

        return (
            <div className="addProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                            <Link to={"/board/" + this.props.match.params.id + "/taskboard"} className="btn btn-outline-dark">
                                Back to Board
                            </Link>

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
                                    >
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>

                                </div>

                                <div className="buttons-container">
                                    <div className="buttons-group">

                                        <button
                                            onClick={this.onCancelClickHandler}
                                            className="btn btn-lg button-item btn-outline-danger"
                                        >
                                            Cancel
                                        </button>

                                        <input type="submit" value="Save" className="btn btn-outline-success btn-lg button-item"/>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
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