import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import validationUtils from "../../utils/validationUtils";
import {updateUserEmail, updateUserPassword} from "../../actions/securityActions";
import authenticationErrorHandle from "../../securityUtils/authenticationErrorHandle";
import {Link} from "react-router-dom";

class Profile extends Component {

    emptyUserPassword = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    constructor() {
        super();
        this.state = {
            user: {},
            changeUserPassword: this.emptyUserPassword,
            email: {
                newEmail: ''
            },
            errors: {}
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onEmailSubmit = this.onEmailSubmit.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.security.user.username !== this.props.match.params.username) {
            this.props.history.push("/")
        }

        this.setState({user: this.props.security.user})
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onEmailChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        let email = {...this.state.email};
        email[name] = value;
        this.setState({email});
    }

    onEmailSubmit(e) {
        e.preventDefault();
        const {email} = this.state;
        this.props.updateUserEmail(email);
    }

    onPasswordChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        let changeUserPassword = {...this.state.changeUserPassword};
        changeUserPassword[name] = value;
        this.setState({changeUserPassword});
    }


    async onPasswordSubmit(e) {
        e.preventDefault();
        const {changeUserPassword} = this.state;
        await this.props.updateUserPassword(changeUserPassword);

        const {errors} = this.state;
        if (authenticationErrorHandle(errors)) {
            this.setState({changeUserPassword: this.emptyUserPassword})
        }
    }

    render() {

        const {errors, user, changeUserPassword, email} = this.state;

        const emailValidMessage = validationUtils(errors, 'newEmail');
        const currentPasswordValidMessage = validationUtils(errors, 'currentPassword');
        const newPasswordValidMessage = validationUtils(errors, 'newPassword');
        const confirmNewPasswordValidMessage = validationUtils(errors, 'confirmNewPassword');
        const authenticationError = authenticationErrorHandle(errors);

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
                                <h1 className="display-3">{user.username}</h1>

                                <div className="card">
                                    <div className="card-body">

                                        <div className="card-text">
                                            <i className="far fa-user mr-4 text-primary"></i>
                                            <span>Carlos Doe</span>
                                        </div>
                                        <div className="card-text">
                                            <i className="far fa-envelope mr-4 text-primary"></i>
                                            <span>{user.email}</span>
                                        </div>

                                        <hr/>


                                        <form onSubmit={this.onEmailSubmit}>

                                            <div className="form-group mb-3">

                                                <span>Change your e-mail:</span>

                                                <input
                                                    type="text"
                                                    className={classnames("form-control form-control-sm w-50", {"is-invalid": emailValidMessage.length})}
                                                    placeholder="E-mail"
                                                    name="newEmail"
                                                    value={email.newEmail}
                                                    onChange={this.onEmailChange}
                                                />

                                                {emailValidMessage}

                                            </div>

                                            <input type="submit" value="Save"
                                                   className="btn btn-sm w-50 btn-outline-success"/>

                                            <hr/>

                                        </form>


                                        <form onSubmit={this.onPasswordSubmit}>

                                            <span>Change your password:</span>

                                            <div className="form-group mb-1">

                                                <input
                                                    type="password"
                                                    className={classnames("form-control form-control-sm w-50 mr-3", {"is-invalid": currentPasswordValidMessage.length || authenticationError})}
                                                    placeholder="Current password"
                                                    name="currentPassword"
                                                    value={changeUserPassword.currentPassword}
                                                    onChange={this.onPasswordChange}
                                                />

                                                {currentPasswordValidMessage}
                                                <span className="error-text">{authenticationError}</span>

                                            </div>


                                            <div className="form-group mb-1">

                                                <input
                                                    type="password"
                                                    className={classnames("form-control form-control-sm w-50 mr-3", {"is-invalid": newPasswordValidMessage.length})}
                                                    placeholder="New password"
                                                    name="newPassword"
                                                    value={changeUserPassword.newPassword}
                                                    onChange={this.onPasswordChange}
                                                />

                                                {newPasswordValidMessage}

                                            </div>


                                            <div className="form-group">

                                                <input
                                                    type="password"
                                                    className={classnames("form-control form-control-sm w-50 mr-3", {"is-invalid": confirmNewPasswordValidMessage.length})}
                                                    placeholder="Confirm new password"
                                                    name="confirmNewPassword"
                                                    value={changeUserPassword.confirmNewPassword}
                                                    onChange={this.onPasswordChange}
                                                />

                                                {confirmNewPasswordValidMessage}

                                            </div>

                                            <input type="submit" value="Save"
                                                   className="btn btn-sm btn-outline-success w-50"/>

                                            <hr/>

                                        </form>


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
    updateUserEmail: PropTypes.func.isRequired,
    updateUserPassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, {updateUserEmail, updateUserPassword})(Profile);