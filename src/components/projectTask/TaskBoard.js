import React, {Component} from 'react';
import TaskItem from "./TaskItem";
import {Link} from "react-router-dom";
import Loading from "../layout/Loading";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProjectTasks, searchProjectTasks, cleanErrors} from "../../actions/projectTaskActions";
import {ButtonToolbar} from "react-bootstrap";
import AddTask from "./AddTask";
import notFoundErrorHandle from "../../utils/notFoundErrorHandle";

class TaskBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            sorting: 'createDate',
            searchCriteria: 'taskSummary',
            errors: {}
        };

        this.modalOpen = this.modalOpen.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onSortingChange = this.onSortingChange.bind(this)
    }

    componentDidMount() {
        this.props.getProjectTasks(this.props.match.params.id, this.state.sorting);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    async onSearchChange(e) {
        await this.setState({[e.target.name]: e.target.value});
        const pb_id = this.props.match.params.id;
        this.props.searchProjectTasks(pb_id, this.state.searchQuery, this.state.sorting)
    }

    onSearchSubmit(e) {
        e.preventDefault();
        const pb_id = this.props.match.params.id;
        this.props.searchProjectTasks(pb_id, this.state.searchQuery, this.state.sorting)
    }

    async onSortingChange(e) {
        await this.setState({[e.target.name]: e.target.value});
        const pb_id = this.props.match.params.id;
        this.props.getProjectTasks(pb_id, this.state.sorting)
    }

    modalOpen() {
        this.setState({
            modalShow: true
        });

        this.props.cleanErrors();
    }

    modalClose() {
        this.setState({
            modalShow: false
        });
    }

    render() {

        const {errors} = this.state;
        const {project_tasks} = this.props.project_tasks;
        const {isLoading} = this.props;

        const todoItems = [];
        const inProgressItems = [];
        const doneItems = [];

        project_tasks.map(task => {
            switch (task.status) {
                case 'TO_DO':
                    todoItems.push(<TaskItem key={task.id} task={task} pb_id={this.props.match.params.id} sorting={this.state.sorting}/>);
                    break;
                case 'IN_PROGRESS':
                    inProgressItems.push(<TaskItem key={task.id} task={task} pb_id={this.props.match.params.id} sorting={this.state.sorting}/>);
                    break;
                case 'DONE':
                    doneItems.push(<TaskItem key={task.id} task={task} pb_id={this.props.match.params.id} sorting={this.state.sorting}/>);
                    break;
                default:
                    break;
            }
        });

        const boardNotFound = notFoundErrorHandle(errors);

        const taskBoard = <React.Fragment>
            <div className="row">
            <div className="col-md-4">
                <div className="card text-center mb-2">
                    <div className="card-header bg-secondary text-white">
                        <h3>TO DO</h3>
                    </div>
                </div>

                {!isLoading &&
                (todoItems.length > 0 ? todoItems :
                    <div className="card-header text-center alert-info">No tasks</div>)
                }

            </div>
            <div className="col-md-4">
                <div className="card text-center mb-2">
                    <div className="card-header bg-primary text-white">
                        <h3>In Progress</h3>
                    </div>
                </div>

                {!isLoading &&
                (inProgressItems.length > 0 ? inProgressItems :
                    <div className="card-header text-center alert-info">No tasks</div>)
                }

            </div>
            <div className="col-md-4">
                <div className="card text-center mb-2">
                    <div className="card-header bg-success text-white">
                        <h3>Done</h3>
                    </div>
                </div>

                {!isLoading &&
                (doneItems.length > 0 ? doneItems :
                    <div className="card-header text-center alert-info">No tasks</div>)
                }

            </div>
            </div>
        </React.Fragment>;



        return (

            <div className="container">

                <ButtonToolbar>

                    <Link to="/board" className="btn btn-outline-secondary mb-3 mr-5">
                        <i className="fas fa-angle-left"> Back</i>
                    </Link>

                    <div onClick={this.modalOpen} className="btn btn-primary mb-3">
                        <i className="fas fa-plus-circle"> Create Project Task</i>
                    </div>

                    <AddTask
                        pb_id={this.props.match.params.id}
                        show={this.state.modalShow}
                        onHide={this.modalClose}
                        sorting={this.state.sorting}
                    />


                    <form className="form-inline mb-0 mt-0 ml-5 mb-3 float-right">

                        <div className="mr-2">Sort by:</div>

                        <select
                            className="form-control mr-2"
                            name="sorting"
                            value={this.state.sorting}
                            onChange={this.onSortingChange}
                        >
                            <option value="createDate">Create date</option>
                            <option value="priority">Priority</option>
                            <option value="updateDate">Update date</option>
                        </select>

                    </form>


                    <form onSubmit={this.onSearchSubmit} className="form-inline mb-0 mt-0 ml-5 mb-3 float-right">

                        <input
                            name="searchQuery"
                            value={this.state.searchQuery}
                            onChange={this.onSearchChange}
                            className="form-control mr-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                </ButtonToolbar>

                <br/>
                <hr/>

                    {!boardNotFound ? taskBoard : <div className="card-header text-center alert-danger">
                        Board not found.
                    </div>}

                {isLoading && <Loading/>}

            </div>
        );
    }
}

TaskBoard.propTypes = {
    getProjectTasks: PropTypes.func.isRequired,
    searchProjectTasks: PropTypes.func.isRequired,
    cleanErrors: PropTypes.func.isRequired,
    project_tasks: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    project_tasks: state.task,
    errors: state.errors,
    isLoading: state.task.isLoading
});

export default connect(mapStateToProps, {getProjectTasks, searchProjectTasks, cleanErrors})(TaskBoard);