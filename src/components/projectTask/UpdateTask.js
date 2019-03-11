import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Loading from "../layout/Loading";
import classnames from "classnames";
import validationUtils from "../../validation/validationUtils";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProjectTask, updateProjectTask} from "../../actions/projectTaskActions";

class UpdateTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditMode: false,
            task: {},
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEditClickHandler = this.onEditClickHandler.bind(this);
    }

    componentDidMount() {
        const pt_id = this.props.match.params.id;
        this.props.getProjectTask(pt_id);
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            errors: nextProps.errors
        });

        if (!Object.keys(nextProps.errors).length) {
            this.setState({
                task: nextProps.project_task.project_task
            });
        }
    }


    /*componentDidMount() {
        fetch(`../../../api/boards/tasks/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => this.setState({task: data}));
        this.setState({isLoading: false})
    }*/


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
        this.props.updateProjectTask(task, task.board.id, this.props.history)


        /*await fetch('../../../api/boards/tasks', {
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
                this.props.history.push("/board/" + task.board.id + "/taskboard");

            }).catch(error => {
                error.then(res => this.setState({validation: res}));
            });*/
    }


    onEditClickHandler(e) {
        e.preventDefault();
        this.setState({isEditMode: !this.state.isEditMode});
    }


    render() {

        const {task, errors, isEditMode} = this.state;

        /*        if (isLoading) {
                    return <Loading/>
                }*/

        let boardId;

        if (Object.keys(task).length) {
            boardId = task.board.id;
        }

        const summaryValidMessage = validationUtils(errors, 'summary');
        const acceptanceCritValidMessage = validationUtils(errors, 'acceptanceCriteria');

        return (
            <div className="addProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                            <Link to={"/board/" + boardId + "/taskboard"} className="btn btn-outline-dark">
                                Back to Board
                            </Link>

                            <h4 className="display-4 text-center">Update Project Task #{task.id}</h4>

                            <form onSubmit={this.onSubmit}>

                                <div className="form-group">

                                    <div className="title-input">Summary:</div>

                                    {!isEditMode &&
                                    <div
                                        className="form-control-lg float-input">
                                        {task.summary}
                                    </div>
                                    }

                                    {isEditMode &&
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
                                    }

                                    {summaryValidMessage}

                                    <hr/>

                                </div>

                                <div className="form-group">

                                    <div className="title-input">Acceptance criteria:</div>

                                    {!isEditMode &&
                                    <div
                                        className="form-control-lg float-input-ac">
                                        {task.acceptanceCriteria}
                                    </div>
                                    }

                                    {isEditMode &&
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
                                    }


                                    {acceptanceCritValidMessage}

                                    <hr/>

                                </div>

                                <div className="form-group">

                                    <div className="title-input">Status:</div>

                                    {!isEditMode &&
                                    <div
                                        className="form-control-lg float-input">
                                        {task.status}
                                    </div>
                                    }

                                    {isEditMode &&
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
                                    }

                                </div>

                                <div className="buttons-container">
                                    <div className="buttons-group">

                                        <button
                                            onClick={this.onEditClickHandler}
                                            className={"btn btn-lg button-item btn-outline-" + (!isEditMode ? "primary" : "danger")}
                                        >
                                            {!isEditMode ? "Edit" : "Cancel"}
                                        </button>

                                        <input type="submit" value="Save"
                                               className="btn btn-outline-success btn-lg button-item"/>
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