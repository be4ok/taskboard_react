import React, {Component} from 'react';
import TaskItem from "./TaskItem";
import {Link} from "react-router-dom";
import Loading from "../layout/Loading";
import axios from "axios/index";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProjectTasks} from "../../actions/projectTaskActions";

class TaskBoard extends Component {

    /*constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            tasks: {}
        };

        this.remove = this.remove.bind(this)
    }*/

    /*    componentWillMount() {
            fetch(`../../api/boards/${this.props.match.params.id}/tasks`)
                .then(response => response.json())
                .then(data => this.setState({
                    tasks: data,
                    isLoading: false
                }))
        }*/

    /*componentWillMount() {

        axios.get(`../../api/boards/${this.props.match.params.id}/tasks`)
            .then(res => this.setState({
                tasks: res.data,
                isLoading: false
            }));

    }*/

    /*remove(id) {
        fetch(`../../api/boards/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTasks = [...this.state.tasks].filter(i => i.id !== id);
            this.setState({tasks: updatedTasks});
        });
    }*/

    componentDidMount() {
        this.props.getProjectTasks(this.props.match.params.id);
    }

    render() {

        const {project_tasks} = this.props.project_tasks;

        /*if (isLoading) {
            return <Loading />
        }*/

        const todoItems = [];
        const inProgressItems = [];
        const doneItems = [];

        project_tasks.map(task => {
            switch (task.status) {
                case 'TO_DO':
                    todoItems.push(<TaskItem key={task.id} task={task}/>);
                    break;
                case 'IN_PROGRESS':
                    inProgressItems.push(<TaskItem key={task.id} task={task}/>);
                    break;
                case 'DONE':
                    doneItems.push(<TaskItem key={task.id} task={task}/>);
                    break;
                default:
                    break;
            }
        });

        return (

            <div className="container">

                <Link to={"/board/" + this.props.match.params.id + "/addtask"} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br/>
                <hr/>

                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>

                        {
                            todoItems.length > 0 ? todoItems :
                                <div className="card-header text-center alert-info">No tasks</div>
                        }

                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>

                        {
                            inProgressItems.length > 0 ? inProgressItems :
                                <div className="card-header text-center alert-info">No tasks</div>
                        }

                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>

                        {
                            doneItems.length > 0 ? doneItems :
                                <div className="card-header text-center alert-info">No tasks</div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

TaskBoard.propTypes = {
    getProjectTasks: PropTypes.func.isRequired,
    project_tasks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project_tasks: state.task
});

export default connect(mapStateToProps, {getProjectTasks})(TaskBoard);