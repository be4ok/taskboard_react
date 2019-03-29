import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import validationUtils from "../../utils/validationUtils";
import {updateUserEmail, updateUserPassword} from "../../actions/securityActions";
import authenticationErrorHandle from "../../securityUtils/authenticationErrorHandle";

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
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                            <h4 className="display-4 text-center">Profile</h4>

                            <div className="form-group">

                                <div className="title-input">Login: {user.username}</div>
                                <div className="title-input">E-mail: {user.email}</div>

                                <form onSubmit={this.onEmailSubmit}>

                                    <div className="form-group">

                                        <div className="title-input">Set new E-mail:</div>

                                        <div>
                                            <input
                                                type="text"
                                                className={classnames("form-control form-control-lg", {"is-invalid": emailValidMessage.length})}
                                                placeholder="E-mail"
                                                name="newEmail"
                                                value={email.newEmail}
                                                onChange={this.onEmailChange}
                                            />
                                        </div>

                                        {emailValidMessage}

                                    </div>

                                    <input type="submit" value="Send" className="btn btn-info btn-block mt-4"/>

                                </form>

                                <div className="mb-5"></div>


                                <form onSubmit={this.onPasswordSubmit}>

                                    <div className="form-group">

                                        <div>
                                            <input
                                                type="password"
                                                className={classnames("form-control form-control-lg", {"is-invalid": currentPasswordValidMessage.length || authenticationError})}
                                                placeholder="Current password"
                                                name="currentPassword"
                                                value={changeUserPassword.currentPassword}
                                                onChange={this.onPasswordChange}
                                            />
                                        </div>

                                        {currentPasswordValidMessage}
                                        <p className="error-text">{authenticationError}</p>

                                    </div>


                                    <div className="form-group">

                                        <div>
                                            <input
                                                type="password"
                                                className={classnames("form-control form-control-lg", {"is-invalid": newPasswordValidMessage.length})}
                                                placeholder="New password"
                                                name="newPassword"
                                                value={changeUserPassword.newPassword}
                                                onChange={this.onPasswordChange}
                                            />
                                        </div>

                                        {newPasswordValidMessage}

                                    </div>


                                    <div className="form-group">

                                        <div>
                                            <input
                                                type="password"
                                                className={classnames("form-control form-control-lg", {"is-invalid": confirmNewPasswordValidMessage.length})}
                                                placeholder="Confirm new password"
                                                name="confirmNewPassword"
                                                value={changeUserPassword.confirmNewPassword}
                                                onChange={this.onPasswordChange}
                                            />
                                        </div>

                                        {confirmNewPasswordValidMessage}

                                    </div>

                                    <input type="submit" value="Confirm" className="btn btn-info btn-block mt-4"/>

                                </form>


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