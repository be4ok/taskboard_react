import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteProjectBoard, cleanErrors} from "../../actions/projectBoardActions";
import {getProjectTaskCount} from "../../actions/projectTaskActions";
import axios from "axios/index";
import {PROXY_LINK} from "../../proxy";
import {ButtonToolbar} from "react-bootstrap";
import UpdateBoard from "./UpdateBoard";

class BoardItem extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            taskCount: 0,
            modalShow: false
        };

        this.modalClose = this.modalClose.bind(this);
        this.modalOpen = this.modalOpen.bind(this)
    }

    clickOpenBoardHandle() {
        window.location.assign("/board/" + this.props.board.id + "/taskboard");
    }

    componentDidMount() {
        this._isMounted = true;

        const {board} = this.props;

        axios.get(`${PROXY_LINK}/api/boards/${board.id}/count`)
            .then(res => {
                if (this._isMounted) {
                    this.setState({taskCount: res.data})
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    remove(pb_id) {
        this.props.deleteProjectBoard(pb_id);
    }

    modalOpen() {

        this.setState({
            modalShow: true
        });

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

        const {board} = this.props;

        // let modalClose = () => this.setState({modalShow: false});

        return (

            <div className="card mb-1 border-primary bg-light mb-3">

                <div className="card-header text-primary">
                    <span>#{board.id}</span>
                    <span className="task-count">Tasks: {this.state.taskCount}</span>
                </div>

                <div className="card card-body">
                    <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>{board.name}</h3>
                            <p>{board.description}</p>
                            <div className="date-info">
                                <span>created: {board.createDate}</span>
                                <br/>
                                {board.updateDate && <span>updated: {board.updateDate}</span>}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-group">
                                <Link to={`/board/${board.id}/taskboard`}>
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered pr-1"> Open Board </i>
                                    </li>
                                </Link>


                                <ButtonToolbar className="list-group-item update">
                                    <div onClick={this.modalOpen}>
                                        <i className="fa fa-edit pr-1"> Update Project Info</i>
                                    </div>

                                    <UpdateBoard
                                        pb_id={board.id}
                                        show={this.state.modalShow}
                                        onHide={this.modalClose}
                                    />

                                </ButtonToolbar>

                                <li
                                    className="list-group-item delete"
                                    onClick={this.remove.bind(this, board.id)}
                                >
                                    <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

BoardItem.propTypes = {
    deleteProjectBoard: PropTypes.func.isRequired,
    cleanErrors: PropTypes.func.isRequired
    //getProjectTaskCount: PropTypes.func.isRequired,
    //project_task_count: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    //project_task_count: state.project_task.project_task_count
});

export default connect(mapStateToProps, {deleteProjectBoard, getProjectTaskCount, cleanErrors})(BoardItem);