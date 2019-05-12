import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUser, updateUser, updateUserEmail, updateUserPassword, uploadAvatar} from "../../../actions/profileActions";
import ChangeUserEmail from "./ChangeUserEmail";
import ChangeUserPassword from "./ChangeUserPassword";
import {Link} from "react-router-dom";
import spinner_loading from '../../../static/img/spinner-loading.svg';
import {badRequestErrorHandle, unsupportedMediaTypeErrorHandle} from '../../../utils/errorHandleUtils';


class Profile extends Component {

    constructor() {
        super();

        this.state = {
            firstName: '',
            secondName: '',
            errors: {},
            isEditMode: false,
            isSaving: false,
            isUploading: false,
            avatar: null
        };

        this.onEditClick = this.onEditClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.OnLoadAvatar = this.OnLoadAvatar.bind(this);

        this.inputOpenFileRef = React.createRef();
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
        });

        if (!this.state.firstName || !this.state.secondName) {
            this.setState({isEditMode: true})
        }
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
        });

        if (!this.state.firstName || !this.state.secondName) {
            this.setState({isEditMode: true})
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    showOpenFileDlg = () => {
        if (!this.state.isUploading) {
            this.inputOpenFileRef.current.click();
        }
    };


    async OnLoadAvatar(e) {
        const img = e.target.files[0];
        let fd = new FormData();

        fd.append('file', img);

        this.setState({isUploading: true});

        await this.props.uploadAvatar(fd);

        this.setState({isUploading: false})
    }


    onEditClick(e) {

        e.preventDefault();

        this.setState({
            isEditMode: !this.state.isEditMode
        })
    }

    render() {

        const {currentUser} = this.props.profile;
        const {errors} = this.state;

        const badRequestErrorMessage = badRequestErrorHandle(errors);
        const unsupportedMediaTypeErrorMessage = unsupportedMediaTypeErrorHandle(errors);

        return (
            <div className="container">

                <div className="row">

                    <div className="col-md-10 m-auto">

                        <div className="row">

                            <div className="col-sm-2 avatar">

                                <div className="text-center">

                                    {this.state.isUploading &&
                                    <img
                                        src={spinner_loading}
                                        alt="Loading..."
                                        className="avatar-loading"
                                    />
                                    }

                                    <img
                                        src={currentUser.avatar ? currentUser.avatar : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"}
                                        className="img-avatar border-primary user-avatar cursor-pointer"
                                        alt="avatar"
                                        onClick={this.showOpenFileDlg}
                                    />


                                    <input
                                        name="avatar"
                                        ref={this.inputOpenFileRef}
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        onChange={this.OnLoadAvatar}
                                        style={{display: 'none'}}
                                    />

                                    <Link to="#" onClick={this.showOpenFileDlg} className="card-link">Upload new</Link>

                                    {badRequestErrorMessage && <p className="error-text">{badRequestErrorMessage}</p>}
                                    {unsupportedMediaTypeErrorMessage && <p className="error-text">{unsupportedMediaTypeErrorMessage}</p>}


                                </div>

                            </div>

                            <div className="col-sm-8">
                                <h1 className="display-3">{currentUser.username}</h1>

                                <div className="card">
                                    <div className="card-body">

                                        <form onSubmit={this.onSubmit}>
                                            <div className="card-text d-flex">
                                                <i className="far fa-user mr-4 text-primary"></i>

                                                {!this.state.isEditMode ?

                                                    <span className="mr-2">{this.state.firstName}</span>

                                                    :

                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        className="form-control form-control-sm mr-2 w-25"
                                                        placeholder="First name"
                                                        onChange={this.onChange}
                                                        value={this.state.firstName}
                                                        disabled={this.state.isSaving}
                                                    />
                                                }

                                                {!this.state.isEditMode ?

                                                    <span className="mr-2">{this.state.secondName}</span>

                                                    :

                                                    <input
                                                        type="text"
                                                        name="secondName"
                                                        className="form-control form-control-sm mr-2 w-25"
                                                        placeholder="Second name"
                                                        onChange={this.onChange}
                                                        value={this.state.secondName}
                                                        disabled={this.state.isSaving}
                                                    />
                                                }

                                                {!this.state.isEditMode ?
                                                    <button onClick={this.onEditClick}
                                                            className="btn btn-sm btn-outline-success">Edit</button>
                                                    :

                                                    <input
                                                        type="submit"
                                                        value={!this.state.isSaving ? "Save" : "Saving..."}
                                                        className="btn btn-sm btn-outline-success mb-0 mr-0"
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
    uploadAvatar: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {
    getUser,
    updateUser,
    updateUserEmail,
    updateUserPassword,
    uploadAvatar
})(Profile);