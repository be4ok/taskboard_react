import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {validationUtils} from "../../../utils/validationUtils";
import {updateUserPassword, cleanErrors} from "../../../actions/profileActions";
import {authorizationErrorHandle} from "../../../securityUtils/authorizationErrorHandle";

class ChangeUserPassword extends Component {

    emptyUserPassword = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            changeUserPassword: this.emptyUserPassword,
            isPasswordSuccessfullyChanged: false,
            errors: {},
            isSaving: false
        };

        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
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

        this.props.cleanErrors();

        this.setState({
            isPasswordSuccessfullyChanged: false,
            isSaving: true
        });

        const {changeUserPassword} = this.state;
        await this.props.updateUserPassword(changeUserPassword);

        this.setState({isSaving: false});

        const {errors} = this.state;

        if (authorizationErrorHandle(errors)) {
            this.setState({changeUserPassword: this.emptyUserPassword})
        }

        if (!errors.apierror) {
            this.setState({
                isPasswordSuccessfullyChanged: true,
                changeUserPassword: this.emptyUserPassword
            })
        }
    }

    render() {

        const {errors, changeUserPassword, isSaving} = this.state;

        const currentPasswordValidMessage = validationUtils(errors, 'currentPassword');
        const newPasswordValidMessage = validationUtils(errors, 'newPassword');
        const confirmNewPasswordValidMessage = validationUtils(errors, 'confirmNewPassword');
        const authenticationError = authorizationErrorHandle(errors);

        return (
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
                        disabled={this.state.isSaving}
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
                        disabled={this.state.isSaving}
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
                        disabled={this.state.isSaving}
                    />

                    {confirmNewPasswordValidMessage}
                    {this.state.isPasswordSuccessfullyChanged &&
                    <span className="text-success">Password has been successfully changed</span>}

                </div>

                <input
                    type="submit"
                    value={!isSaving ? "Save" : "Saving..."}
                    className="btn btn-sm w-50 btn-outline-success"
                    disabled={isSaving}
                />

                <hr/>

            </form>
        );
    }
}

ChangeUserPassword.propTypes = {
    updateUserPassword: PropTypes.func.isRequired,
    cleanErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors,
    isLoading: state.security.isLoading
});

export default connect(mapStateToProps, {updateUserPassword, cleanErrors})(ChangeUserPassword);