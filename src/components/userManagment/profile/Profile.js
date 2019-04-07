import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUser, updateUser, updateUserEmail, updateUserPassword} from "../../../actions/profileActions";
import {Link} from "react-router-dom";
import ChangeUserEmail from "./ChangeUserEmail";
import ChangeUserPassword from "./ChangeUserPassword";

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            secondName: '',
            errors: {},
            isEditMode: false,
            isSaving: false
        };

        this.onEditClick = this.onEditClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    async componentDidMount() {
        if (this.props.security.user.username !== this.props.match.params.username) {
            this.props.history.push("/")
        }

        await this.props.getUser();

        this.setState({
            firstName: this.props.profile.currentUser.firstName,
            secondName: this.props.profile.currentUser.secondName,
        })
    }

    async onSubmit(e) {
        e.preventDefault();

        this.setState({isSaving: true});

        const user = {
            id: this.props.profile.currentUser.id,
            firstName: this.state.firstName,
            secondName: this.state.secondName
        };

        await this.props.updateUser(user);

        this.setState({
            isEditMode: !this.state.isEditMode,
            isSaving: false
        })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onEditClick(e) {

        e.preventDefault();

        this.setState({
            isEditMode: !this.state.isEditMode
        })
    }

    render() {

        const {currentUser} = this.props.profile;

        return (
            <div className="container">

                <div className="row">

                    <div className="col-md-10 m-auto">

                        <div className="row">

                            <div className="col-sm-2 avatar">

                                <div className="text-center">
                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                         className="img-avatar border-primary rounded-circle"
                                         alt="avatar"
                                    />
                                    <Link to="#" className="card-link">Upload new</Link>
                                </div>

                            </div>

                            <div className="col-sm-8">
                                <h1 className="display-3">{currentUser.username}</h1>

                                <div className="card">
                                    <div className="card-body">

                                        <form onSubmit={this.onSubmit}>
                                            <div className="card-text d-flex">
                                                <i className="far fa-user mr-4 text-primary"></i>
                                                {(this.state.firstName && !this.state.isEditMode) ?

                                                    <span className="mr-2">{this.state.firstName}</span>

                                                    :

                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        className="form-control form-control-sm mr-2 w-25"
                                                        placeholder="First name"
                                                        onChange={this.onChange}
                                                        value={this.state.firstName}
                                                    />
                                                }

                                                {(this.state.secondName && !this.state.isEditMode) ?

                                                    <span className="mr-2">{this.state.secondName}</span>

                                                    :

                                                    <input
                                                        type="text"
                                                        name="secondName"
                                                        className="form-control form-control-sm mr-2 w-25"
                                                        placeholder="Second name"
                                                        onChange={this.onChange}
                                                        value={this.state.secondName}
                                                    />
                                                }

                                                {!this.state.isEditMode ?
                                                    <button onClick={this.onEditClick}
                                                            className="btn btn-sm btn-outline-success">Edit</button>
                                                    :

                                                    <input
                                                        type="submit"
                                                        value={!this.state.isSaving ? "Save" : "Saving..."}
                                                        className="btn btn-sm btn-outline-success"
                                                        disabled={this.state.isSaving}
                                                    />
                                                }
                                            </div>

                                        </form>

                                        <div className="card-text">
                                            <i className="far fa-envelope mr-4 text-primary"></i>
                                            <span>{currentUser.email}</span>
                                        </div>


                                        <hr/>


                                        <ChangeUserEmail/>

                                        <ChangeUserPassword/>


                                    </div>
                                </div>

                            </div>


                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    updateUser: PropTypes.func.isRequired,
    updateUserEmail: PropTypes.func.isRequired,
    updateUserPassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    security: state.security,
    errors: state.errors,
    isLoading: state.security.isLoading
});

export default connect(mapStateToProps, {getUser, updateUser, updateUserEmail, updateUserPassword})(Profile);