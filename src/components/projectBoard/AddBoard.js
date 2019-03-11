import React, {Component} from 'react';
import {Link} from "react-router-dom";
import classnames from "classnames";
import validationUtils from "../../validation/validationUtils";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addProjectBoard} from "../../actions/projectBoardActions";

class AddBoard extends Component {

    emptyBoard = {
        name: '',
        description: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            board: this.emptyBoard,
            errors: {},
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
        let board = {...this.state.board};
        board[name] = value;
        this.setState({board});
    }

    onSubmit(e) {
        e.preventDefault();

        const {board} = this.state;
        this.props.addProjectBoard(board, this.props.history)

        /*const {board} = this.state;
        await fetch('/api/boards', {
            method: 'POST',
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

    onCancelClickHandler(e) {
        e.preventDefault();
        this.props.history.push("/board");
    }

    /*    validationChanged(field, isValid) {
            const {valid} = this.state;
            valid[field] = isValid;
            this.setState({valid});
        }*/

    render() {

        const {board, errors} = this.state;

        const nameValidMessage = validationUtils(errors, 'name');
        const descrValidMessage = validationUtils(errors, 'description');

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">

                        <Link to={"/"} className="btn btn-outline-dark">
                            Back to Boards
                        </Link>

                        <h4 className="display-4 text-center">Add a new project board</h4>

                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">

                                <div className="title-input">Name:</div>

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

                                {nameValidMessage}

                                <hr/>

                            </div>

                            <div className="form-group">

                                <div className="title-input">Description:</div>

                                <div>
                                    <textarea
                                        className={classnames("form-control form-control-lg", {"is-invalid": descrValidMessage.length})}
                                        placeholder="Description"
                                        name="description"
                                        value={board.description}
                                        onChange={this.onChange}
                                    />
                                </div>

                                {descrValidMessage}

                                <hr/>

                            </div>

                            <div className="buttons-container">
                                <div className="buttons-group">

                                    <button
                                        onClick={this.onCancelClickHandler}
                                        className="btn btn-lg button-item btn-outline-danger"
                                    >
                                        Cancel
                                    </button>

                                    <input type="submit" value="Save"
                                           className="btn btn-outline-success btn-lg button-item"/>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AddBoard.propTypes = {
    addProjectBoard: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {addProjectBoard})(AddBoard);