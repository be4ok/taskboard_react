import React, {Component} from 'react';
import BoardItem from './BoardItem';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProjectBoards, cleanErrors} from "../../actions/projectBoardActions";
import Loading from "../layout/Loading"
import {ButtonToolbar} from "react-bootstrap";
import AddBoard from "./AddBoard";

class ProjectBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false
        };

        this.modalOpen = this.modalOpen.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    componentDidMount() {
        this.props.getProjectBoards();
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

        const {project_boards} = this.props.project_boards;
        const {isLoading} = this.props;

        let boardsArray = [];

        project_boards.map(board => {
            return boardsArray.push(<BoardItem key={board.id} board={board} remove={this.remove}/>);
        });


        const boardItems =
            <React.Fragment>

                {
                    boardsArray.length === 0 &&
                    <div className="card-header text-center alert-info">
                        No boards.
                        <Link to={"/board/add"} className="card-link"> Create new board</Link>
                    </div>
                }

                {boardsArray}
            </React.Fragment>;

        return (

            <div className="container">
                <h4 className="display-4 text-center">Your project boards</h4>

                <ButtonToolbar>
                    <div onClick={this.modalOpen} className="btn btn-primary mb-3">
                        <i className="fas fa-plus-circle"> Create New Board</i>
                    </div>

                    <AddBoard
                        show={this.state.modalShow}
                        onHide={this.modalClose}
                    />
                </ButtonToolbar>

                <hr/>

                {isLoading ? <Loading/> : boardItems}

            </div>
        );
    }
}

ProjectBoard.propTypes = {
    getProjectBoards: PropTypes.func.isRequired,
    cleanErrors: PropTypes.func.isRequired,
    project_boards: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    project_boards: state.board,
    isLoading: state.board.isLoading
});

export default connect(mapStateToProps, {getProjectBoards, cleanErrors})(ProjectBoard);