import React, {Component} from 'react';
import BoardItem from './BoardItem';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProjectBoards} from "../../actions/projectBoardActions";

class ProjectBoard extends Component {

    /*    constructor(props) {
            super(props);
            this.state = {
                isLoading: true,
                boards: []
            };

            this.remove = this.remove.bind(this)
        }*/

    /*    componentWillMount() {
            fetch("http://localhost:8080/api/boards/")
                .then(response => response.json())
                .then(data => this.setState({
                    boards: data,
                    isLoading: false
                }))
        }*/

    /*    remove(id) {
        fetch(`/api/boards/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedBoards = [...this.state.boards].filter(i => i.id !== id);
            this.setState({boards: updatedBoards});
        });
    }*/

    /*    componentWillMount() {

        axios.get("http://localhost:8080/api/boards/")
            .then(res => this.setState({
                boards: res.data,
                isLoading: false
            }));

    }*/

    componentDidMount() {
        this.props.getProjectBoards();
    }

    render() {

        const {project_boards} = this.props.project_boards;

        let boardsArray = [];

        project_boards.map(board => {
            return boardsArray.push(<BoardItem key={board.id} board={board} remove={this.remove}/>);
        });

        return (

            <div className="container">
                <h4 className="display-4 text-center">Your project boards</h4>

                <Link to={"/board/add"} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create New Board</i>
                </Link>

                <hr/>

                <div className="row">
                    {
                        boardsArray.length === 0 && <div className="card-header text-center alert-info">No boards</div>
                    }

                    {boardsArray}

                </div>

            </div>
        );

    }
}

ProjectBoard.propTypes = {
    getProjectBoards: PropTypes.func.isRequired,
    project_boards: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project_boards: state.board
});

export default connect(mapStateToProps, {getProjectBoards})(ProjectBoard);