import React, {Component} from 'react';
import BoardItem from './BoardItem';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProjectBoards, searchProjectBoards, cleanErrors} from "../../actions/projectBoardActions";
import Loading from "../layout/Loading"
import {ButtonToolbar} from "react-bootstrap";
import AddBoard from "./AddBoard";

class ProjectBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            searchQuery: ''
        };

        this.modalOpen = this.modalOpen.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
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

    async onSearchChange(e) {
        await this.setState({searchQuery: e.target.value});
        this.props.searchProjectBoards(this.state.searchQuery)
    }

    onSearchSubmit(e) {
        e.preventDefault();
        this.props.searchProjectBoards(this.state.searchQuery);
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
                        No boards. Please create a new.
                    </div>
                }
                {boardsArray}

            </React.Fragment>;

        return (

            <div className="container">
                <h4 className="display-4 text-center mb-5">Your project boards</h4>

                <ButtonToolbar>
                    <div onClick={this.modalOpen} className="btn btn-primary">
                        <i className="fas fa-plus-circle"> Create New Board</i>
                    </div>

                    <form onSubmit={this.onSearchSubmit} className="form-inline mb-0 mt-0 ml-5 float-right">
                        <input
                            name="search"
                            value={this.state.searchQuery}
                            onChange={this.onSearchChange}
                            className="form-control mr-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

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
    searchProjectBoards: PropTypes.func.isRequired,
    cleanErrors: PropTypes.func.isRequired,
    project_boards: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    project_boards: state.board,
    isLoading: state.board.isLoading
});

export default connect(mapStateToProps, {getProjectBoards, searchProjectBoards, cleanErrors})(ProjectBoard);