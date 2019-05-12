import React, {Component} from 'react';
import classnames from "classnames";
import {validationUtils} from "../../utils/validationUtils";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProjectTask, updateProjectTask} from "../../actions/projectTaskActions";

class UpdateTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            task: {},
            isSaving: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const pt_id = this.props.pt_id;
        this.props.getProjectTask(pt_id);
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            errors: nextProps.errors
        });

        if (!Object.keys(nextProps.errors).length && nextProps.project_task.project_task.id === this.props.pt_id) {
            this.setState({
                task: nextProps.project_task.project_task
            });
        }
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
        await this.props.updateProjectTask(task, task.board.id, this.props.sorting);

        this.setState({isSaving: false});

        const {errors} = this.state;

        if (!Object.keys(errors).length) {
            this.props.toggle();
        }
    }

    render() {

        const {task, errors} = this.state;

        const summaryValidMessage = validationUtils(errors, 'summary');
        const acceptanceCritValidMessage = validationUtils(errors, 'acceptanceCriteria');

        return (

                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">

                                <h2 className="text-center">{task.summary}</h2>

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
                                        className={classnames("form-control form-control-lg", {"is-invalid": acceptanceCritValidMessage.length})}
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        value={task.acceptanceCriteria}
                                        onChange={this.onChange}
                                        disabled={this.state.isSaving}
                                    />
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
                                                onClick={this.props.toggle}
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

        );
    }
}

UpdateTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project_task: state.task,
    errors: state.errors
});

export default connect(mapStateToProps, {getProjectTask, updateProjectTask})(UpdateTask)