import React, {Component} from 'react';
import classnames from "classnames";
import validationUtils from "../../utils/validationUtils";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProjectBoard, updateProjectBoard} from "../../actions/projectBoardActions";
import {Modal} from "react-bootstrap";

class UpdateBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            board: {},
            isSaving: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const pb_id = this.props.pb_id;
        this.props.getProjectBoard(pb_id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errors: nextProps.errors
        });

        if (!Object.keys(nextProps.errors).length && nextProps.project_board.project_board.id === this.props.pb_id) {
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

    async onSubmit(e) {
        e.preventDefault();

        this.setState({isSaving: true});

        const {board} = this.state;

        await this.props.updateProjectBoard(board);

        this.setState({isSaving: true});

        const {errors} = this.state;

        if (!Object.keys(errors).length) {
            this.props.onHide();
        }
    }

    render() {

        const {board, errors} = this.state;
        const {show, onHide} = this.props;

        const nameValidMessage = validationUtils(errors, 'name');
        const descrValidMessage = validationUtils(errors, 'description');


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

                                <h4 className="display-4 text-center">Update Project Board #{board.id}</h4>

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
                                                disabled={this.state.isSaving}
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
                                        disabled={this.state.isSaving}
                                    />
                                        </div>

                                        {descrValidMessage}

                                        <hr/>

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

UpdateBoard.propTypes = {
    getProjectBoard: PropTypes.func.isRequired,
    updateProjectBoard: PropTypes.func.isRequired,
    project_board: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project_board: state.board,
    errors: state.errors
});

export default connect(mapStateToProps, {getProjectBoard, updateProjectBoard})(UpdateBoard);