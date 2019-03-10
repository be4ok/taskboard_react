import React, {Component} from 'react';
import {Link} from "react-router-dom";
import classnames from "classnames";
import validationUtils from "../validationUtils";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProjectBoard, updateProjectBoard} from "../../actions/projectBoardActions";

class UpdateBoard extends Component {

    constructor() {
        super();

        this.state = {
            //isLoading: true,
            isEditMode: false,
            board: {},
            validation: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEditClickHandler = this.onEditClickHandler.bind(this);
    }

    componentDidMount() {
        const pb_id = this.props.match.params.id;
        this.props.getProjectBoard(pb_id, this.props.history);
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            validation: nextProps.validation
        });

        if (!Object.keys(nextProps.validation).length) {
            this.setState({
                board: nextProps.project_board.project_board
            });
        }
    }

    onChange(e) {

        const value = e.target.value;
        const name = e.target.name;
        let board = {...this.state.board};
        board[name] = value;
        this.setState({board});
    }

    onSubmit(e) {
        e.preventDefault();
        const {board} = this.state;
        this.props.updateProjectBoard(board, this.props.history)


        /*await fetch('../../api/boards', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        })
            .then(responseObject => {
                if (!responseObject.ok) {
                    throw responseObject.json();
                }
                this.setState({validation: []});
                this.props.history.push("/");

            }).catch(error => {
                error.then(res => this.setState({validation: res}));
            });*/

    }


    onEditClickHandler(e) {
        this.setState({validation: {}});
        e.preventDefault();
        this.setState({isEditMode: !this.state.isEditMode});
    }


    render() {

        const {board, isEditMode, validation} = this.state;

        /*if (isLoading) {
            return <Loading/>
        }*/

        const nameValidMessage = validationUtils(validation, 'name');
        const descrValidMessage = validationUtils(validation, 'description');


        return (
            <div className="addProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                            <Link to={"/board"} className="btn btn-outline-dark">
                                Back to Boards
                            </Link>

                            <h4 className="display-4 text-center">Update Project Board #{board.id}</h4>

                            <form onSubmit={this.onSubmit}>

                                <div className="form-group">

                                    <div className="title-input">Name:</div>

                                    {!isEditMode &&
                                    <div
                                        className="form-control-lg float-input">
                                        {board.name}
                                    </div>
                                    }

                                    {isEditMode &&
                                    <div>
                                        <input
                                            autoFocus
                                            className={classnames("form-control form-control-lg", {"is-invalid": nameValidMessage.length})}
                                            type="text"
                                            name="name"
                                            placeholder="Project Board name"
                                            value={board.name}
                                            onChange={this.onChange}
                                            autoComplete="name"
                                            id="name"
                                        />
                                    </div>
                                    }

                                    {nameValidMessage}

                                    <hr/>

                                </div>

                                <div className="form-group">

                                    <div className="title-input">Description:</div>

                                    {!isEditMode &&
                                    <div
                                        className="form-control-lg float-input-ac">
                                        {board.description}
                                    </div>
                                    }

                                    {isEditMode &&
                                    <div>
                                    <textarea
                                        className={classnames("form-control form-control-lg", {"is-invalid": descrValidMessage.length})}
                                        placeholder="Description"
                                        name="description"
                                        value={board.description}
                                        onChange={this.onChange}
                                    />
                                    </div>
                                    }

                                    {descrValidMessage}

                                    <hr/>

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

UpdateBoard.propTypes = {
    getProjectBoard: PropTypes.func.isRequired,
    updateProjectBoard: PropTypes.func.isRequired,
    project_board: PropTypes.object.isRequired,
    validation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project_board: state.board,
    validation: state.validation
});

export default connect(mapStateToProps, {getProjectBoard, updateProjectBoard})(UpdateBoard);