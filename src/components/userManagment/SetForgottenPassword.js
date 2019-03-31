import React, {Component} from "react";
import {cleanErrors, setForgottenPassword} from "../../actions/securityActions";
import PropTypes from "prop-types";
import Loading from "../layout/Loading";
import {connect} from "react-redux";
import classnames from "classnames";
import validationUtils from "../../utils/validationUtils";
import {Link} from "react-router-dom";
import authenticationErrorHandle from "../../securityUtils/authenticationErrorHandle";

class Register extends Component {

    constructor() {
        super();

        this.state = {
            newPassword: "",
            confirmNewPassword: "",
            errors: {},
            isPasswordSet: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/board")
        }

        this.props.cleanErrors();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    async onSubmit(e) {
        e.preventDefault();

        const newUserPassword = {
            newPassword: this.state.newPassword,
            confirmNewPassword: this.state.confirmNewPassword
        };

        await this.props.setForgottenPassword(this.props.match.params.resetCode, newUserPassword);

        const {errors} = this.state;

        if (!errors.apierror) {
            this.setState({
                isPasswordSet: true,
            })
        }

        this.setState({
            newPassword: "",
            confirmNewPassword: ""
        })

    }


    render() {

        const {errors} = this.state;
        const {isLoading} = this.props;

        const passwordValidMessage = validationUtils(errors, 'newPassword');
        const confirmPasswordValidMessage = validationUtils(errors, 'confirmNewPassword');
        const authenticationError = authenticationErrorHandle(errors);

        return (
            <div className="container login-container">
                <div className="row pl-2 pr-2">
                    <div className="col-md-6 login-form m-auto">

                        <h2 className="text-center">Reset password</h2>
                        <p className="lead text-center">Set your new password</p>

                        {this.state.isPasswordSet &&
                        <div className="card-header text-center alert-success mb-4">
                            New password has been set. <br/>
                            Please, visit <Link to="/login" className="card-link">login page</Link> for log-in.
                        </div>
                        }

                        {authenticationError &&
                        <div className="card-header text-center alert-danger mb-4">
                            Invalid reset code.<br/>
                            Please, check your e-mail and visit the correct link.
                        </div>
                        }

                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">

                                <input
                                    autoFocus
                                    type="password"
                                    className={classnames("form-control form-control-lg", {"is-invalid": passwordValidMessage.length})}
                                    placeholder="Password*"
                                    name="newPassword"
                                    value={this.state.newPassword}
                                    onChange={this.onChange}
                                />

                                {passwordValidMessage}

                            </div>


                            <div className="form-group">

                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {"is-invalid": confirmPasswordValidMessage.length})}
                                    placeholder="Confirm Password*"
                                    name="confirmNewPassword"
                                    value={this.state.confirmNewPassword}
                                    onChange={this.onChange}
                                />

                                {confirmPasswordValidMessage}

                            </div>


                            <div className="form-group mt-4 mb-4">

                                {isLoading ? <Loading/> :
                                    <input type="submit"
                                           value="Send"
                                           className="btn btn-lg btn-outline-success btnSubmit"
                                    />}

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    setForgottenPassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security,
    isLoading: state.security.isLoading
});
export default connect(mapStateToProps, {cleanErrors, setForgottenPassword})(Register);